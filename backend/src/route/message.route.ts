import express, { Request, Response } from 'express';
import protectRoute from '../middlewire/authChecker';
import wrapAsync from '../middlewire/asyncWrapper';
import CustomError from '../utils/CustomError';
import { DataResponse } from '../types';
import { getMessages, sendMessage } from '../controller/message.controller';

const messageRoutes = express.Router();

messageRoutes.get(
  '/:id',
  protectRoute,
  wrapAsync([], async (req: Request, res: Response) => {
    const data = (await getMessages(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);
messageRoutes.post(
  '/send/:id',
  protectRoute,
  wrapAsync([], async (req: Request, res: Response) => {
    const data = (await sendMessage(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);

export default messageRoutes;
