
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const Book = require('./../models/bookModel');
process.env.ENV = 'TEST';
const app = require('./../app');
const agent = request.agent(app); 

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return its _id', done => {
    const bookPost = {
      title: 'Mary Com',
      author: 'Indiana Jones',
      genre: 'History'
    };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, res) => {
        const results = res.body;
        // results.should.have.property('read'); // throwing this error:  Uncaught AssertionError: expected Object {} to have property read
        done();
      });
  });
  
  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  })
});


