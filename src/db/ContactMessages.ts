// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//   name: { type: String, require: true },
//   subject: { type: String, require: true },
//   message: { type: String, require: true },
//   date: { type: String, require: true },
// });

// export const messageModel = mongoose.model('Message', messageSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface IContactMessages extends Document {
  name: String;
  email: String;
  message: String;
  createdAt: Date;
}

const ContactMessageSchema: Schema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  message: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model<IContactMessages>(
  'ContactMessage',
  ContactMessageSchema
);
export default ContactMessage;
