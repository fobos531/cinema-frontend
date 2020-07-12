import axios from 'axios'
const baseUrl = '/api/login'

const login = (loginData) => {
  return axios.post(baseUrl, loginData).then(response => response.data).catch(error => error.response.data);
}

export default { login }