// import mongoose, { Schema, Document } from 'mongoose';

// interface BlogPost extends Document {
//   title: String;
//   body: String;
//   createdAt: Date;
// }

// const Blogs: Schema = new Schema({
//   title: { type: String, require: true },
//   body: { type: String, require: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const BlogsArticles = mongoose.model<BlogPost>('BlogsArticles', Blogs);
// export default BlogsArticles;

import mongoose from 'mongoose';

const BlogsPostSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
