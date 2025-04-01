import express, { Response, Request, NextFunction } from 'express';
import {
  createBlog,
  deletePost,
  getAllPost,
  getOnePost,
  updatePost,
} from '../controllers/Blogs';
import { isAuthenticated } from '../middlewares';
import upload from '../utils/multer';
import { validateBlog } from '../validation/blogValidation';

export default (router: express.Router) => {
  router.post(
    '/blogs',
    isAuthenticated,
    upload.single('image'),
    ...validateBlog,
    (req: Request, res: Response, next: NextFunction) => {
      createBlog(req, res).catch(next);
    }
  );
  router.get('/blogs', isAuthenticated, getAllPost);
  router.get('/blogs/:postId', isAuthenticated, getOnePost);
  router.delete('/blogs/:postId', isAuthenticated, deletePost);
  router.put(
    '/blogs/:postId',
    isAuthenticated,
    upload.single('image'),
    ...validateBlog,
    updatePost
  );
};
