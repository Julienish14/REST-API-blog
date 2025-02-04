import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, require: true },
  subject: { type: String, require: true },
  message: { type: String, require: true },
});

export const messageModel = mongoose.model('Message', messageSchema);
