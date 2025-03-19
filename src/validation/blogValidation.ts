import { body, validationResult } from 'express-validator';
import express from 'express';

export const validateBlog = [
  body('title').trim().withMessage('Please Enter the title of this article'),
  body('content').trim().withMessage('Please Enter the content of the article'),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
