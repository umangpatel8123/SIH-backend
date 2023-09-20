import express from 'express';
import {Server} from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Import socketIo correctly
import {Server as socketIo} from 'socket.io';

const io = new socketIo(server, {
  cors: {
    origin: true, // Replace with your React.js app URL
  },
});

// Handle socket connections
io.on('connection', socket => {
  console.log('A user connected');

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle joining a room
  socket.on('joinRoom', roomName => {
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);
  });

  // Handle location data sharing
  socket.on('locationUpdate', (roomName, locationData) => {
    // Broadcast the location data to everyone in the room
    io.to(roomName).emit('locationUpdate', locationData);
  });
});

server.listen(4000, () => {
  console.log('Socket is running on port 4000');
});
