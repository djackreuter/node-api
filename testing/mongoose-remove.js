const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => console.log(res));

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5b5b6f8045c4da0ae698faa8').then((todo) => {
  console.log(todo);
});