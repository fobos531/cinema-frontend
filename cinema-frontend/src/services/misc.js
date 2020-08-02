import axios from 'axios'
const baseUrl = '/api/misc'

let config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  }
}

const getAllSeatsByScreeningTimeId = async (id) => {
  const url = (`${baseUrl}/seats/${id}`)
  const response = await axios.get(url)
  return response.data
}

const getCinemaTicketPrice = async (id) => {
  const url = (`${baseUrl}/ticketPrice/${id}`)
  const response = await axios.get(url)
  return response.data.ticketPrice // u .ticketPrice se nalazi ticket price
}

const verifyToken = async () => {
  const url = (`${baseUrl}/verifyToken`)
  const response = await axios.get(url, config)
  return response.data // vraća objekt koji ima boolean property s nazivom "authenticated"
}

const verifyTokenAdmin = async () => {
  const url = (`${baseUrl}/verifyTokenAdmin`)
  const response = await axios.get(url, config)
  return response.data // vraća objekt koji ima boolean property s nazivom "authenticated"
}

export default { getAllSeatsByScreeningTimeId, getCinemaTicketPrice, verifyToken, verifyTokenAdmin }