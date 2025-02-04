import express from 'express';

import authentication from './authentication';
import users from './users';
import contactMessages from './contactMessages';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  contactMessages(router);

  return router;
};
