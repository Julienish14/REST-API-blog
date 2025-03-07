import multer from 'multer';
import express from 'express';

const storage = multer.memoryStorage();

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('img/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed bruh 😢!'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;

// const storage = multer.diskStorage({
//   destination: (req: express.Request, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req: express.Request, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]
//     );
//   },
// });

// const fileFilter = (
//   req: express.Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed bruh 😢!'));
//   }
// };

// export const upload = multer({ storage, fileFilter });
