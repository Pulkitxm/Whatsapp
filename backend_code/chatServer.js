const socketio = require('socket.io');

const socketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
          origin: '*',
        }
      });

    io.on('connection', (socket) => {
        // Joining room corresponding to user ID
        socket.on('joinRoom', (userId) => {
            socket.join(userId);
        });

        // Sending message to a specific user
        socket.on('privateMessage', ({ senderId,receiverId, message }) => {
            io.emit('new-message', {
                receiverId,
                senderId,
                message,
            });
        });
    });
};

module.exports = socketServer;
