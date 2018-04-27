const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use port 3000 if no environment variable is set
const port = process.env.PORT || 3000;

// Set up the public directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Listen for a new connection
io.on('connection', socket => {
  console.log('New user connected');

  // Greet a new user
  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app!')
  );

  // Let others know that a new user has joined
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'A new user has joined')
  );

  socket.on('createMessage', message => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
