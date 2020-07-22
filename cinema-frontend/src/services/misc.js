import axios from 'axios'
const baseUrl = '/api/misc'

const getAllSeatsByCinemaId = async (id) => {
  const url = (`${baseUrl}/seats/${id}`)
  const response = await axios.get(url)
  return response.data
}

export default { getAllSeatsByCinemaId }