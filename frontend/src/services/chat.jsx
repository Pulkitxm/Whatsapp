import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/chats';

const fetchAll = async () => {
  const response = await axios.get(baseUrl); // Use axios.get for a GET request
  return response.data;
}

const upload = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

export default { fetchAll, upload, update };
