import axios from 'axios'
const baseUrl = '/api/cinemas'

const addCinema = async (newCinema) => {
  console.log(newCinema)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
  }
  await axios.post(baseUrl, newCinema, config)
  // return response.data; not needed for now
}

const allCinemas = async () => {
  const response = await axios.get(baseUrl)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}



const deleteCinema = async (id) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

export default { addCinema, allCinemas, deleteCinema }