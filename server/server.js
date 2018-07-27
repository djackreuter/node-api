const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if (!todo) return res.status(404).send('Not found');
      res.send({todo});
    }).catch((err) => {
      res.status(400).send();
    });
  }
  else {
    res.status(404).send('ID is not valid');
  }
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(ObjectID.isValid(id)) {
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send('Id not found! :/');
      }
      res.send({todo});
    }).catch((err) => res.status(400).send());
  } else {
    res.status(400).send('Id not valid');
  }
});

app.listen(port, () => console.log(`Started server on port ${port}...`));

module.exports = {app}