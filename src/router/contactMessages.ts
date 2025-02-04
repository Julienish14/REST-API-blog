import express from 'express';

import { submitMessage } from '../controllers/ContactMessages';

export default (router: express.Router) => {
  router.post('/contact', submitMessage);
};
