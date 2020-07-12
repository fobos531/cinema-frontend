import axios from 'axios'
const baseUrl = '/api/users'

const register = async (newUser) => {
  const userToAdd = {
    email: newUser.email,
    username: newUser.username,
    password: newUser.password,
    name: `${newUser.firstName} ${newUser.lastName}`
  }
  const response = await axios.post(baseUrl, userToAdd);
  console.log(response.data);
  // return response.data; not needed for now
}

export default { register }