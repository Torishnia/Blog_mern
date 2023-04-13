import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect('mongodb+srv://valeritorishnya:mern_stack@cluster0.vo0f4pl.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
})