import { body, validationResult } from 'express-validator';
import express from 'express';

export const validateBlog = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please Enter the title of this article'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Please Enter the content of the article'),
  body('blogImage')
    .optional()
    .isString()
    .withMessage('Image must be a valid string'),
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
