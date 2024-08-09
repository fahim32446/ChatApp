import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173/', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleWire = cors(corsOptions);
export default corsMiddleWire;
