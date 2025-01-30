import express from 'express';
import { register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });
  router.post('/auth/register', register);
};
