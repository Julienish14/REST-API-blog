import express from 'express';

import BlogsArticles from '../db/Blogs';

export const createBlog = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { title, body } = req.body;
  try {
    const newBlog = new BlogsArticles({ title, body });
    await newBlog.save();
    res.status(201).json({
      message: 'New Blog Article created successfully!',
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAllPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const GetMeAllPost = await BlogsArticles.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: 'All Blog Articles: ', data: GetMeAllPost });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getOnePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
