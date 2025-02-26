import express from 'express';
import {
  createBlog,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.post('/blogs', isAuthenticated, createBlog);
  router.get('/blogs', isAuthenticated, getAllPost);
  router.get('/blogs/:postId', isAuthenticated, getOnePost);
  router.delete('/blogs/:postId', isAuthenticated, deletePost);
  router.put('/blogs/:postId', isAuthenticated, updatePost);
};
