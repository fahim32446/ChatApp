import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user.model';
import generateTokenAndSetCookie from '../utils/libs';

export const signup = async (req: Request, res: Response) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const profilePic =
    gender === 'male'
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic,
  });

  generateTokenAndSetCookie(newUser._id, res);
  await newUser.save();

  const data = {
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  };

  return {
    success: true,
    data,
    message: 'User signup successfully done',
  };
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ''
  );

  if (!user || !isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  generateTokenAndSetCookie(user._id, res);

  const data = {
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
  };

  return {
    success: true,
    data,
    message: 'User login successfully done',
  };
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 });

  return {
    success: true,
    message: 'Logged out successfully',
  };
};
