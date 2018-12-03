const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const homedir = os.homedir();
  const todosPath = path.join(homedir, '.todos');
  fs.readFile(todosPath, (err, data) => {
    if (err) {
      res.send(JSON.stringify({ error: err }));
    } else {
      const todos = data
        .toString('utf8')
        .split('\n')
        .filter(x => !!x)
        .map(todo => {
          const [name, due] = todo.split(',')
          return {name, due: parseInt(due)};
        });
      res.send(JSON.stringify({ todos }));
    }
  });
});

app.post('/api/todos/create', (req, res) => {
  const {name, due} = req.body.todo;
  const homedir = os.homedir();
  const todosPath = path.join(homedir, '.todos');
  fs.appendFile(todosPath, name + ',' + due + '\n', error => {
    if (error) {
      res.status(500).render('error', {error});
    } else {
      res.status(200).send('OK');
    }
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
