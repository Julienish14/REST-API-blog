import express from 'express';
import ContactMessage from '../db/ContactMessages';

export const submitMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.sendStatus(200).json();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
