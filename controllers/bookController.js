const Book = require('./../models/bookModel');

class bookController {

  static get(req, res) {
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
  }

  static post(req, res) {
    if(!req.body.title || !req.body.genre || !req.body.author) {
      res.status(400);
      return res.send('Incomplete data send');
    } 
    const book = new Book(req.body);
    console.log(book);
    book.save();
    res.status(204);
    return res.json(book);
  }
}

module.exports = bookController;