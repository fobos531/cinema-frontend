import axios from 'axios'
const baseUrl = '/api/screeningtimes'

const addScreeningTime = async (newScreeningTime) => {
  console.log(newScreeningTime)
  await axios.post(baseUrl, newScreeningTime)
}

const allCinemas = async () => {
  const response = await axios.get(baseUrl)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

const deleteCinema = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

export default { addScreeningTime, allCinemas, deleteCinema }