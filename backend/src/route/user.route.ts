import express, { Request, Response } from 'express';
import { getUserInfo } from '../controller/user.controller';
import wrapAsync from '../middlewire/asyncWrapper';
import protectRoute from '../middlewire/authChecker';
import { DataResponse } from '../types';
import CustomError from '../utils/CustomError';

const userRoutes = express.Router();

userRoutes.get(
  '/',
  protectRoute,
  wrapAsync([], async (req: Request, res: Response) => {
    const data = (await getUserInfo(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);

export default userRoutes;
