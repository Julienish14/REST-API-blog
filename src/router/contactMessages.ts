import express from 'express';

import { submitMessage } from '../controllers/ContactMessages';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/contacts', isAuthenticated, submitMessage);
};
