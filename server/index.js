const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  readTodos((err, todos) => {
    if (handleError(res, err)) {
      return;
    }

    res.send(JSON.stringify({ todos }));
  });
});

app.post('/api/todos/create', (req, res) => {
  const {id, name, due} = req.body.todo;
  readTodos((err, todos) => {
    if (handleError(res, err)) {
      return;
    }

    const updated = todos.concat({id, name, due, completed: false});
    writeTodos(updated, err => {
      if (handleError(res, err)) {
        return;
      }
      res.status(200).send('OK');
    });
  }); 
});

/**
 * returns true if error was handled, false if
 * there was no error
 */
function handleError(res, error) {
  if (error) {
    res.status(500).render('error', {error});
    return true;
  }
  return false;
}

function readTodos(cb) {
  const homedir = os.homedir();
  const todosPath = path.join(homedir, '.todos');
  fs.readFile(todosPath, (err, data) => {
    if (err) {
      cb(err);
      return;
    } else {
      const todos = data
        .toString('utf8')
        .split('\n')
        .filter(x => !!x)
        .map(todo => {
          const [id, name, due, completed] = todo.split(',')
          return {
            name, 
            due: parseInt(due),
            id: parseInt(id), 
            completed: completed === "1" ? true : false,
          };
        });
      cb(null, todos);
    }
  });
}

function writeTodos(todos, cb) {
  const homedir = os.homedir();
  const todosPath = path.join(homedir, '.todos');
  fs.writeFile(
    todosPath, 
    todos.map(
      ({id, name, due, completed}) => {
        return [id, name, due, completed ? 1 : 0].join(',');
      }).join('\n'),
    err => { cb(err); });
}

app.post('/api/todos/update', (req, res) => {
  const {id, name, due, completed} = req.body.update;
  readTodos((err, todos) => {
    if (handleError(res, err)) {
      return;
    }

    const todo = todos.find(todo => todo.id === id);
    const updated = todos
      .filter(todo => todo.id !== id)
      .concat({
        id,
        name: name || todo.name,
        due: due || todo.due, 
        completed: completed || todo.completed, 
      });
    writeTodos(updated, err => {
      if (handleError(res, err)) {
        return;
      }

      res.status(200).send('OK');
    });
  }); 
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
