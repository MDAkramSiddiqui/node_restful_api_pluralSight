const should = require('should');
const sinon = require('sinon');
const bookController = require('./../controllers/bookController');

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title, genre or author on post', () => {
      const Book = function(book) { this.save = () => {}};

      const req = {
        body: {
          author: 'John'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy() 
      };

      const controller = bookController;
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);

      res.send.calledWith('Incomplete data send').should.equal(true);
    });
  });
});