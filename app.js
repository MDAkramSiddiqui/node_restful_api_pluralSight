const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/bookModel');

const app = express();
const mongodb = mongoose.connect('mongodb://localhost/bookAPI', { useUnifiedTopology: true, useNewUrlParser: true });
const PORT = process.env.PORT || 3000;
const bookRouter = express.Router();


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
