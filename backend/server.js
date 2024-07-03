import express from 'express';
import 'dotenv/config';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    connectToMongoDB();
  console.log(`Example app listening on port ${port}`)
})