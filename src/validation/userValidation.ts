// import { body, validationResult } from 'express-validator';
// import express from 'express';

// export const validateUser = [
//   body('fullname')
//     .trim()
//     .isLength({ min: 4 })
//     .withMessage('Fullname must be at least 8 characters long')
//     .isAlphanumeric()
//     .withMessage('Fullname must conatin only letters'),

//   body('username')
//     .trim()
//     .isLength({ min: 4 })
//     .withMessage('Username must be at least 3 characters long')
//     .isAlphanumeric()
//     .withMessage('Username must contain only letter and number'),

//   body('email')
//     .trim()
//     .isEmail()
//     .withMessage('Please enter a valid email address'),

//   body('password')
//     .trim()
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),

//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ): Promise<void> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../db/users';

export const validateUser: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Fullname is required')
    .isLength({ min: 4 })
    .withMessage('Fullname must be at least 4 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Fullname can only contain letters and spaces'),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username can only contain letters and numbers')
    .custom(async username => {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        throw new Error('Username already in use');
      }
    }),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .custom(async email => {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          // param: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
