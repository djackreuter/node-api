const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

var id = '5b5a21d069644b035763aa05';
var userId = '5b58c47fe668a5dc7b24c1b7';

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id:', todo);
// }).catch((err) => console.log(err));

if (ObjectID.isValid(userId)) {
  User.findById(userId).then((user) => {
    if (!user) return console.log('User not found');
    console.log('User by id', user);
  }, (err) => {
    console.log(err);
  }); 
} else {
    console.log('Id is invalid');
  }