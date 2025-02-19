import express from 'express';

import authentication from './authentication';
import users from './users';
import contactMessages from './contactMessages';
import blog from './blog';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  contactMessages(router);
  blog(router);
  return router;
};
