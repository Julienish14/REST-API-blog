import express from 'express';

import BlogsArticles from 'db/Blogs';

export const createBlog = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { title, body } = req.body;
  try {
    const newBlog = new BlogsArticles({ title, body });
    await newBlog.save();
  } catch (error) {
    console.log(error);
  }
};
