import axios from 'axios'

const login = async credentials => {
  const response = await axios.post('http://localhost:3001/api/login', credentials)
  return response.data
}

const signup = async credentials => {
  const response = await axios.post('http://localhost:3001/api/users', credentials)
  return response.data
}

const getUsers = async credentials => {
  const response = await axios.get('http://localhost:3001/api/login', credentials)
  return response.data
}

export default { login,signup,getUsers }