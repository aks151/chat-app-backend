import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js'
import userRoutes from './src/routes/userRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';


connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);


// initializeSocketIO(io);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});