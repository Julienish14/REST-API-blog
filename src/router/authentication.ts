import express from 'express';
import { register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });
};
