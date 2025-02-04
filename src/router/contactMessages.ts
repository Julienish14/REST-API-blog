import express from 'express';

import { submitMessage, deleteMessage } from '../controllers/ContactMessages';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/contacts', isAuthenticated, submitMessage);
  router.delete('/contacts/:id', isAuthenticated, deleteMessage);
};
