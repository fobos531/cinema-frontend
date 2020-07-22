import reservationsService from '../../services/reservations'
import miscService from '../../services/misc'

export const getSeatsForSelectedCinema = (id) => {
  return async dispatch => {
    const response = await miscService.getAllSeatsByCinemaId(id);
    dispatch({ type: 'GET_SEATS_FOR_SELECTED_CINEMA', payload: response})
  }
}

export const setOccupiedSeats = (id, seats) => {
  return async dispatch => {
    const response = await reservationsService.setOccupiedSeats(id, seats)
    dispatch({ type: 'SET_SELECTED_SEATS', payload: response }) 
  }
}
