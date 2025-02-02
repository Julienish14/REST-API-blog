import express from 'express';
import AsyncHandler from 'express-async-handler';

import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get(
    '/users',
    // AsyncHandler(isAuthenticated),
    // isAuthenticated,
    AsyncHandler(getAllUsers)
    // getAllUsers
  );
};
