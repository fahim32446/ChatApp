import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError'; // adjust the path as necessary

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      error: err.message,
      details: err.stack,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
};

export default errorHandler;
