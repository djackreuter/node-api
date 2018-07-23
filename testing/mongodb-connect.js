const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Could not connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Keep working on Node course',
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Jack',
    age: 25,
    location: 'Santa Fe, NM'
  }, (err, res) => {
    if (err) {
      return console.log('Unable to insert record', err);
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  })
  client.close();
});