import express, { NextFunction } from 'express';
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

export const getAllMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'All Messages : ', data: messages });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getOnlyMessage = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const onlyOneMessage = await ContactMessage.findById({req.params.messageId});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const deletedMessage = await ContactMessage.deleteOne({
      _id: req.params.messageId,
    });
    res
      .status(200)
      .json({ message: 'Message Deleted Successfully!', data: deleteMessage });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
