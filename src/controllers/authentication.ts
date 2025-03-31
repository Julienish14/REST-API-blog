import express, { Response, Request, NextFunction } from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';
import { validationResult } from 'express-validator';

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password, fullname, username } = req.body;
    if (!email || !password || !fullname || !username) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
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

    return res.status(201).json({
      success: true,
      message: 'Registered successfully!',
      data: user,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

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
