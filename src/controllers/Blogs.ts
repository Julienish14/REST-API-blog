import express from 'express';
import BlogsArticles from '../db/Blogs';
import { uploadImage } from '../utils/cloudinary';

export const createBlog = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { title, content } = req.body;
  const imageUrl = req.file ? await uploadImage(req.file) : null;
  try {
    const newBlog = await BlogsArticles.create({ title, content, imageUrl });
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
  res: express.Response
) => {
  try {
    const getMeAllPost = await BlogsArticles.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: 'All Blog Articles: ', data: getMeAllPost });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getOnePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getOnlyOnePost = await BlogsArticles.findById({
      _id: req.params.postId,
    });
    res.status(200).json({ message: 'Get Me one post', data: getOnlyOnePost });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletePostByID = await BlogsArticles.deleteOne({
      _id: req.params.postId,
    });

    res
      .status(200)
      .json({ message: 'Article Deleted Successfully!', data: deletePostByID });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const imageUrl = req.file ? await uploadImage(req.file) : null;

    const updateBlogByID = await BlogsArticles.findByIdAndUpdate(
      postId,
      { title, content, imageUrl },
      { new: true }
    );
    if (!updateBlogByID) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res
      .status(201)
      .json({ message: 'Blog update successfully!', data: updateBlogByID });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
