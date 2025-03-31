import express, { Response, Request, NextFunction, Router } from 'express';

import { login, logout, register } from '../controllers/authentication';
import { validateUser } from '../validation/userValidation';

export default (router: express.Router) => {
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });

  router.post(
    '/auth/register',
    ...validateUser,
    (req: Request, res: Response, next: NextFunction) => {
      register(req, res).catch(next);
    }
  );

  router.post('/auth/login', login);
  router.post('/auth/logout', logout);
};
