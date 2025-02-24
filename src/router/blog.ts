import express from 'express';
import { createBlog, getAllPost } from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/blogs', isAuthenticated, createBlog);
  router.get('/blogs', isAuthenticated, getAllPost);
};
