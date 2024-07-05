import express, { Request, Response } from 'express';
import { login, logout, signup } from '../controller/auth.controller';
import { body } from 'express-validator';
import wrapAsync from '../middlewire/asyncWrapper';
import CustomError from '../utils/CustomError';
import { DataResponse } from '../types';

const authRoutes = express.Router();

const signupValidators = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required'),
  body('gender')
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),
];
const signInValidators = [
  body('username').notEmpty().withMessage('User name is required'),
];

authRoutes.post(
  '/signup',
  wrapAsync(signupValidators, async (req: Request, res: Response) => {
    const data = (await signup(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);

authRoutes.post(
  '/login',
  wrapAsync(signInValidators, async (req: Request, res: Response) => {
    const data = (await login(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);

authRoutes.post(
  '/logout',
  wrapAsync([], async (req: Request, res: Response) => {
    const data = (await logout(req, res)) as DataResponse;
    if (data.success) {
      res.status(200).json(data);
    } else {
      new CustomError(`Error in ${req.url}`, 500, 'Internal server Error');
    }
  })
);

export default authRoutes;
