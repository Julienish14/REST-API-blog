import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('fullname')
    .trim()
    .isLength({ min: 12 })
    .withMessage('Fullname must be at least 4 characters long')
    .isAlphanumeric()
    .withMessage('Fullname must conatin only letters'),

  body('username')
    .trim()
    .isLength({ min: 6 })
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
];
