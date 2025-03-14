import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './router';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const MONGO_URL = process.env.DB_CONN;

mongoose.Promise = Promise;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('connected to database: ', mongoose.connection.name);
  })
  .catch((error: Error) => {
    console.log('MongoDB connection error ❌ :', error);
  });

app.use('/api/v1/', router());
