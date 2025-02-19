import express from 'express';
import { createBlog } from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/blogs', isAuthenticated, createBlog);
};
