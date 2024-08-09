import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './route/auth.route';
import messageRoutes from './route/message.route';
import userRoutes from './route/user.route';
import errorHandler from './middlewire/errorHandler';
import morgan from 'morgan';
import connectToMongoDB from './db_connect';
import corsMiddleWire from './middlewire/cors';
import { app, server } from './utils/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(corsMiddleWire);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/other-users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('SERVER RUNNING');
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running at ${PORT}`);
});

app.use(errorHandler);
