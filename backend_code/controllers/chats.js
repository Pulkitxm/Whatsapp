const jwt = require('jsonwebtoken');
const chatsRouter = require('express').Router();
const Chat = require('../models/chat');
const User = require('../models/user'); 
const http = require('http').Server(chatsRouter);

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:9000"
  }
});

chatsRouter.get('/api/chats', async (request, response) => {
  try {
    const chats = await Chat.find({});
    response.status(202).json(chats);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

chatsRouter.get('/api/chats/:id', async (request, response) => {
  try {
    const updatedChat = await Chat.findById(
      request.params.id
    );
    response.status(202).json(updatedChat); // Respond with updatedChat
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

chatsRouter.post('/api/chats', async (request, response, next) => {
  const { senderId, receiverId, chats } = request.body;
  
  try {
    // Ensure both sender and receiver exist in the User model
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);

    if (!senderUser || !receiverUser) {
      return response.status(400).json({ error: 'Sender or receiver not found' });
    }

    const newChat = new Chat({ senderId, receiverId, chats });
    await newChat.save();
    response.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

chatsRouter.put('/api/chats/:id', async (request, response, next) => {
  const { chats } = request.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      request.params.id,
      { chats },
      { new: true }
    );
    // const updatedChat = await Chat.findById(
    //   request.params.id,
    // );

    if (!updatedChat) {
      return response.status(404).json({ error: 'Chat not found' });
    }

    response.json(updatedChat);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = chatsRouter;