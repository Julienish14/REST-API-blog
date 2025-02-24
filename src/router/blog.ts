import express from 'express';
import { createBlog, getAllPost, getOnePost } from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/blogs', isAuthenticated, createBlog);
  router.get('/blogs', isAuthenticated, getAllPost);
  router.get('/blogs/postId', isAuthenticated, getOnePost);
};
