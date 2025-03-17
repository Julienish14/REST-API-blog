import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('fullname')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 4 characters long')
    .isAlphanumeric()
    .withMessage('Fullname must conatin only letters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address'),
];
