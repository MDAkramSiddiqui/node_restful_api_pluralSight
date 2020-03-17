const express = require('express');

const bookRoutes = function(Book) {
  const bookRouter = express.Router();

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
  
  return bookRouter;
}

module.exports = bookRoutes;