
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

// Array to store room information
const rooms = [];

// Serve static files
app.use(express.static('public'));

// Listen for incoming connections
io.on('connection', (socket) => {
  console.log('User connected');

  // Handle join-room event
  socket.on('join-room', ({ roomId, username }) => {
    console.log(`User ${username} joined room ${roomId}`);

    // Check if room exists
    let room = rooms.find((room) => room.id === roomId);

    if (!room) {
      // Create new room if it doesn't exist
      room = { id: roomId, users: [] };
      rooms.push(room);
    }

    // Add user to room
    const user = { id: socket.id, username };
    room.users.push(user);

    // Send list of users in room to all users in the room
    io.to(roomId).emit('user-list', room.users);

    // Join the room
    socket.join(roomId);
  });

  // Handle signal event
  socket.on('signal', ({ roomId, to, signal }) => {
    console.log(`Sending signal to ${to} in room ${roomId}`);
    io.to(to).emit('signal', { from: socket.id, signal });
  });

  // Handle end-call event
  socket.on('end-call', ({ roomId, caller, callee, startTime, endTime }) => {
    console.log(`Call ended by ${caller} with ${callee} on ${endTime}`);

    // Send call-ended event to all users in the room
    io.to(roomId).emit('call-ended', { caller, callee, startTime, endTime });
  });

  // Handle user-disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');

    // Remove user from room
    let roomIndex = -1;
    let userIndex = -1;

    for (let i = 0; i < rooms.length; i++) {
      userIndex = rooms[i].users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        roomIndex = i;
        break;
      }
    }

    if (roomIndex !== -1 && userIndex !== -1) {
      rooms[roomIndex].users.splice(userIndex, 1);
      io.to(rooms[roomIndex].id).emit('user-list', rooms[roomIndex].users);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});