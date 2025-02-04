import express from 'express';
import ContactMessage from 'db/ContactMessages';

export const submitMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
