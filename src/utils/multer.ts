import multer from 'multer';
import express from 'express';

const storage = multer.memoryStorage();

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed bruh 😢!'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
