import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const hostname = '127.0.0.1';

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use('/api', router);

const port = process.env.PORT || 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
