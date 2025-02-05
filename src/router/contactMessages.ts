import express from 'express';

import {
  submitMessage,
  getAllMessage,
  getOnlyOneMessage,
  deleteMessage,
} from '../controllers/ContactMessages';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/contacts', isAuthenticated, submitMessage);
  router.delete('/contacts/:messageId', isAuthenticated, deleteMessage);
  router.get('/contacts', isAuthenticated, getAllMessage);
  router.get('/contacts', isAuthenticated, getOnlyOneMessage);
};
