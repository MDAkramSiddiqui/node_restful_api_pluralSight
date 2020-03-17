//es lint special linting options for this file or even a specific line can be added via es-lint comments
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

  bookRouter.use('/books/:bookID', (req, res, next) => {
    Book.findById(req.params.bookID, (err, book) =>{
      if(err) res.send(err);

      if(book) {
        req.book = book;
        return next();
      }
      else res.sendStatus(404);
    });
  });

  bookRouter.route('/books/:bookID')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save(err => {
        if(err) return res.send(err);
        else return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if(req.body._id) delete req.body._id;
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save(err => {
        if(err) return res.send(err);
        else return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if(err) return res.send(err);
        return res.sendStatus(204);
      });
    });
  
  return bookRouter;
}

module.exports = bookRoutes;