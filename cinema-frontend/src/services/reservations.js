import axios from 'axios'
const baseUrl = '/api/reservations'

const setOccupiedSeats = async (id, seats) => { //by cinema id
  const url = (`${baseUrl}/cinema/${id}`)
  console.log(url, seats)
  const response = await axios.patch(url, seats)
  return response.data
}

export default { setOccupiedSeats }