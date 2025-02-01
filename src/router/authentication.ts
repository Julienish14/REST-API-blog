import express from 'express';
import { login, register } from '../controllers/authentication';
import AsyncHandler from 'express-async-handler';

export default (router: express.Router) => {
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });
  router.post('/auth/register', AsyncHandler(register));
  router.post('/auth/login', AsyncHandler(login));
};
