import express from 'express';
import { get, identity, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const sessionToken = req.cookies['JULISH-AUTH'];
    if (!sessionToken) {
      res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
