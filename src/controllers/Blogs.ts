import express, { Response, Request } from 'express';
import BlogsArticles from '../db/Blogs';
import { uploadImage } from '../utils/cloudinary';
import { validationResult } from 'express-validator';

export const createBlog = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, tags } = req.body;

    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = await uploadImage(req.file);
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image',
        });
      }
    }

    const newBlog = await BlogsArticles.create({
      title,
      content,
      imageUrl,
      // tags: tags || [],
      // author: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: {
        id: newBlog._id,
        title: newBlog.title,
        excerpt: newBlog.content.substring(0, 100) + '...',
        imageUrl: newBlog.imageUrl,
        createdAt: newBlog.createdAt,
      },
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// export const createBlog = async (
//   req: express.Request,
//   res: express.Response
// ): Promise<void> => {
//   const { title, content } = req.body;
//   const imageUrl = req.file ? await uploadImage(req.file) : null;
//   try {
//     const newBlog = await BlogsArticles.create({ title, content, imageUrl });
//     res.status(201).json({
//       message: 'New Blog Article created successfully!',
//       data: newBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

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
