import express from 'express';
import { register } from '../controllers/authentication';
import AsyncHandler from 'express-async-handler';

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     res.status(201).json({ message: 'User registerd!' });
//   } catch (error) {
//     next(error);
//   }
// };

export default (router: express.Router) => {
  router.get('/', (req, res) => {
    res.send('Welcome to blog API');
  });
  router.post('/auth/register', AsyncHandler(register));
};
