const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();
mongoose.connect('mongodb://localhost/bookAPI', { useUnifiedTopology: true, useNewUrlParser: true });
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(PORT, () => {
  console.log(`Connected to the PORT: ${PORT}`);
});
