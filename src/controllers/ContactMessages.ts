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

    res
      .status(201)
      .json({ message: 'Message submitted successfully!', data: newMessage });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
