import reservationService from '../../services/reservations'

export const getReservations = () => {
  return async dispatch => {
    const response = await reservationService.allReservations();
    dispatch({ type: 'GET_RESERVATIONS', payload: response})
  }
}

export const getReservationsForUser = (id) => {
  return async dispatch => {
    const response = await reservationService.getReservationsForUser(id);
    dispatch({ type: 'GET_RESERVATIONS_FOR_USER', payload: response})
  }
}

export const rateReservation = (id, rating) => {
  return async dispatch => {
    const response = await reservationService.rateReservation(id, {rating: rating});
    dispatch({ type: 'RATE_RESERVATION', payload: response})
  }
}