import express from 'express';

import BlogsArticles from 'db/Blogs';

export const createBlog = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { title, body } = req.body;
  } catch (error) {
    console.log(error);
  }
};
