import axios from 'axios'
const baseUrl = '/api/screeningtimes'

let config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  }
}

const addScreeningTime = async (newScreeningTime) => {
  console.log(newScreeningTime)
  await axios.post(baseUrl, newScreeningTime, config)
}

const allScreeningTimes = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

const deleteScreeningTime = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

const deleteMany = async () => {
  const response = await axios.get(`${baseUrl}/deleteMany`, config)
 // return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

export default { addScreeningTime, allScreeningTimes, deleteScreeningTime, deleteMany }