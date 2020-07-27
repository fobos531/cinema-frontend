import axios from 'axios'
const baseUrl = '/api/users'

let config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  }
}

const register = async (newUser) => {
  const userToAdd = {
    email: newUser.email,
    username: newUser.username,
    password: newUser.password,
    name: `${newUser.firstName} ${newUser.lastName}`
  }
  const response = await axios.post(baseUrl, userToAdd);
  return response.data;
}

const totalUsers = async () => {
  const response = await axios.get(`${baseUrl}/totalUsers`);
  return response.data;
}

const updateUser = async (updatedUserDetails) => {
  console.log(updatedUserDetails);
  const response = await axios.put(baseUrl, updatedUserDetails, config)
  return response.data
}

const resetPassword = async (email) => {
  const response = await axios.patch(baseUrl, email)
  return response.data
}

export default { register, totalUsers, updateUser, resetPassword }