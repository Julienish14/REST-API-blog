import express from 'express';
import { getUsers } from '../db/users';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const user = await getUsers();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
