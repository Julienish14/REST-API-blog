import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateBlog = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5-100 characters')
    .escape(),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters')
    .escape(),

  body('blogImage')
    .optional()
    .isString()
    .withMessage('Image must be a valid string')
    .isURL()
    .withMessage('Image must be a valid URL')
    .trim(),

  body('tags')
    .optional()
    .isArray({ min: 1, max: 5 })
    .withMessage('You can add 1-5 tags'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

// import { body, validationResult } from 'express-validator';
// import express from 'express';

// export const validateBlog = [
//   body('title')
//     .trim()
//     .isLength({ min: 5 })
//     .withMessage('Please Enter the title of this article'),
//   body('content')
//     .trim()
//     .isLength({ min: 10 })
//     .withMessage('Please Enter the content of the article'),
//   body('blogImage')
//     .optional()
//     .isString()
//     .withMessage('Image must be a valid string'),
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
