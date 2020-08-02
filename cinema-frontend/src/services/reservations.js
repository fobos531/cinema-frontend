import axios from 'axios'
const baseUrl = '/api/reservations'

let config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  }
}

const setOccupiedSeats = async (id, seats) => { //by cinema id
  const url = (`${baseUrl}/screeningTime/${id}`)
  console.log(url, seats)
  const response = await axios.patch(url, seats, config)
  return response.data
}

const saveReservation = async (reservation) => {
  console.log(reservation)
  const response = await axios.post(baseUrl, reservation, config)
  console.log("response", response.data)
  return response.data
}

const allReservations = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data; 
}

const getReservationsForUser = async (id) => {
  console.log(`${baseUrl}/${id}`)
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const rateReservation = async (id, rating) => {
  const response = await axios.patch(`${baseUrl}/rate/${id}`, rating, config)
  return response.data;
}

export default { setOccupiedSeats, saveReservation, allReservations, getReservationsForUser, rateReservation }