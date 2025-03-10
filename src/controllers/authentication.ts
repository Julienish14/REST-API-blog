import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      'email username authentication.salt authentication.password'
    );

    if (!user) {
      res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie('JULISH-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
