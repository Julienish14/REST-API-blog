import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      'fullname email username authentication.salt authentication.password'
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
    const { email, password, fullname, username } = req.body;

    if (!email || !password || !fullname || !username) {
      res
        .sendStatus(401)
        .json({ message: 'Enter your email, fullname, username, password' });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(409).json({ message: `User with this email already exist ` });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      fullname,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.clearCookie('JULISH-AUTH');
    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
