//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'jack', age: 25}
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Could not connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((res) => {
  //   console.log(res);
  // });
  // db.collection('Users').deleteMany({location: 'Santa Fe'}).then((res) => {
  //   console.log(res);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
  //   console.log(res);
  // });
  // db.collection('Users').findOneAndDelete({
  //     _id: new ObjectID('5b574f90f61b4b8956fe1d5d')
  //   }).then((res) => {
  //     console.log(res);
  //   });

  // client.close();
});