import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

const userSocketMap: any = {};

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173/', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

export const getReceiverSocketId = (receiverId: any) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log(socket.id);

  const userId: any = socket.handshake.query.userId;

  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
