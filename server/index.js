const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    todos: [
      {name: 'do laundry', due: Date.now()},
      {name: 'write some code', due: Date.parse("November 30, 2018")},
      {name: 'clean my room', due: Date.parse("December 31, 2018")},
    ]
  }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
