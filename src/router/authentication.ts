import express from 'express';
import { login, logout, register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.post('/auth/logout', logout);
};
