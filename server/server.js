const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

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

  socket.on('createMessage', message => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
