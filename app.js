const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Book = require('./models/bookModel');

const app = express();
const mongodb = mongoose.connect('mongodb://localhost/bookAPI', { useUnifiedTopology: true, useNewUrlParser: true });
const PORT = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    console.log(book);
    book.save();
    return res.json(book).status(201);
  });

bookRouter.route('/books')
  .get((req, res) => {
    // const { query } = req;
    // filtering the query, here only for genre query paran
    const query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if(err) return res.send(err);
      else return res.json(books);
    });
  });

  bookRouter.route('/books/:bookID')
  .get((req, res) => {
    const bookID = req.params.bookID;
    Book.findById(bookID, (err, book) => {
      if(err) return res.send(err);
      else return res.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(PORT, () => {
  console.log(`Connected to the PORT: ${PORT}`);
});
