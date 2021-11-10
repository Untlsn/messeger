import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { messages } from '~/messages';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
  serveClient: false,
})

io.on('connection', socket => {
  messages(socket);
})

server.listen(8080, () => console.log('listening on http://localhost:8080'))

















