const jwt = require('jsonwebtoken');
const chatsRouter = require('express').Router();
const Chat = require('../models/chat');
const User = require('../models/user'); 

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
[
  "64fc088b3d27952f5c394352",
  "64fc3fe65e1b9def1fcdc2d8",
  "[{\"id\":\"64fc3fe65e1b9def1fcdc2d8\",\"chats\":[{\"text\":\"hello\",\"time\":\"6:37 PM\",\"date\":\"9/23\"}]}]"
]