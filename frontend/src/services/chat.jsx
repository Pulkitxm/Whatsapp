import axios from 'axios';
import { io } from 'socket.io-client';

const baseUrl = 'http://localhost:3001';

const fetchAll = async () => {
  const response = await axios.get(baseUrl+"/api/chats"); // Use axios.get for a GET request
  return response.data;
}

const upload = async (newObject,senderId,receiverId,textMessage) => {
  const socket = io(baseUrl);
  socket.emit('privateMessage', { senderId, receiverId , message:textMessage });
  const response = await axios.post(baseUrl+"/api/chats", newObject);
  return response.data;
}

const update = async (id, newObject,senderId,receiverId,textMessage) => {
  const socket = io(baseUrl);
  socket.emit('privateMessage', { senderId, receiverId , message:textMessage });
  const response = await axios.put(`${baseUrl}/api/chats/${id}`, newObject);
  return response.data;
}

export default { fetchAll, upload, update };
