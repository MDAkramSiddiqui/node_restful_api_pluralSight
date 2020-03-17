const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();
const PORT = process.env.PORT || 3000;

if(process.env.ENV === 'TEST') {
  console.log('Connected to Testing Database');
  mongoose.connect('mongodb://localhost/bookAPI-test', { useUnifiedTopology: true, useNewUrlParser: true });
} else {
  console.log('Connected to Production Database');
  mongoose.connect('mongodb://localhost/bookAPI', { useUnifiedTopology: true, useNewUrlParser: true });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(PORT, () => {
  console.log(`Connected to the PORT: ${PORT}`);
});

module.exports = app;