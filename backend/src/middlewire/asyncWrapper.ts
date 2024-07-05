import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../utils/CustomError';
import ValidationErr from '../utils/ValidationErr';

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type Validator = (req: Request, res: Response, next: NextFunction) => void;

const wrapAsync = (validators: Validator[], cb: Func) => {
  return [
    ...validators,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          throw new ValidationErr(errors);
        }

        await cb(req, res, next);
      } catch (err: any) {
        console.log({ error: err });

        next(new CustomError(err.message, err.status, err.type));
      }
    },
  ];
};

export default wrapAsync;
