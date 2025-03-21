import { body, validationResult } from 'express-validator';
import express from 'express';

export const validateUser = [
  body('fullname')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Fullname must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Fullname must conatin only letters'),

  body('username')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letter and number'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

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
