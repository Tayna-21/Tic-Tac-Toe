import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
  res.json('hello')
});

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on('message', (data) => {
    console.log(data)
    socket.emit('response', data)
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running`);
});
