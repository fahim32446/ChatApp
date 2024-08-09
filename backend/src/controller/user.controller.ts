import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUserInfo = async (req: Request, res: Response) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select('-password');

  return {
    success: true,
    data: filteredUsers,
    message: 'Other user data',
  };
};
