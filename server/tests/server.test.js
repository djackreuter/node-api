const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID,
  text: 'First test todo'
}, {
  _id: new ObjectID,
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        res.body.text = text;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with bad data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let id = new ObjectID
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 for non valid object ids', (done) => {
    request(app)
      .get('/todos/1234')
      .expect(404)
      .end(done)
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', (done) => {
    let id = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return a 404', (done) => {
    let id = new ObjectID
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  });

  it('should return a 404 if ObjectID is invalid', (done) => {
    request(app)
      .delete('/todos/1234')
      .expect(400)
      .end(done)
  });
});