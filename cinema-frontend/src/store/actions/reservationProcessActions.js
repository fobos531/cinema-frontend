import reservationsService from '../../services/reservations'
import miscService from '../../services/misc'

export const getSeatsForSelectedScreeningTime = (id) => {
  return async dispatch => {
    const response = await miscService.getAllSeatsByScreeningTimeId(id);
    dispatch({ type: 'GET_SEATS_FOR_SELECTED_SCREENING_TIME', payload: response})
  }
}

export const setOccupiedSeats = (id, seats) => {
  return async dispatch => {
    const response = await reservationsService.setOccupiedSeats(id, seats)
    dispatch({ type: 'SET_OCCUPIED_SEATS', payload: response }) 
  }
}

export const setPickedSeats = (seats) => {
  return {
    type: 'SET_PICKED_SEATS',
    payload: seats
  }
}

export const setCurrentlySelectedCinema = (cinema) => {
  return {
    type: 'SET_SELECTED_CINEMA',
    payload: cinema,
  }
}

export const setCurrentlySelectedScreeningTime = (screening_time) => {
  return {
    type: 'SET_SELECTED_SCREENING_TIME',
    payload: screening_time,
  }
}

export const setCurrentlySelectedMovie = (movie) => {
  return {
    type: 'SET_SELECTED_MOVIE',
    payload: movie,
  }
}

export const updateTotalPrice = (price) => {
  console.log(price)
  return {
    type: 'UPDATE_TOTAL_PRICE',
    payload: Number(price),
  }
}

export const setOrderId = (orderId) => {
  return {
    type: 'SET_ORDER_ID',
    payload: orderId,
  }
}