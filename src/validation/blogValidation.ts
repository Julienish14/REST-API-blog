import { body, validationResult } from 'express-validator';
import express from 'express';

export const validateBlog = [
  body('title').trim().withMessage('Please Enter the title of this article'),
  body('content').trim().withMessage('Please Enter the content of the article'),
];
