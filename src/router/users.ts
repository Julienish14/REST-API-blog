import express from 'express';
import AsyncHandler from 'express-async-handler';

import { getAllUsers } from 'controllers/users';

export default (router: express.Router) => {
  router.get('/users', AsyncHandler(getAllUsers));
};
