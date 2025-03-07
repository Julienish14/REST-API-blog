import mongoose from 'mongoose';

const BlogsPostSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BlogsArticles = mongoose.model('BlogsArticles', BlogsPostSchema);
export default BlogsArticles;
