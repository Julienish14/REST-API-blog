import express from 'express';
import {
  createBlog,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';
import upload from '../utils/multer';

export default (router: express.Router) => {
  router.post(
    '/blogs',
    isAuthenticated,
    (req, res, next) => {
      console.log('Request body: ', req.body);
      console.log('Request files: ', req.file);
    },

    upload.single('image'),
    createBlog
  );
  router.get('/blogs', isAuthenticated, getAllPost);
  router.get('/blogs/:postId', isAuthenticated, getOnePost);
  router.delete('/blogs/:postId', isAuthenticated, deletePost);
  router.put(
    '/blogs/:postId',
    isAuthenticated,
    upload.single('image'),
    updatePost
  );
};
