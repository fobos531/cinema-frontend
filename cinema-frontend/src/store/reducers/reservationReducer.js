/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */

const initialState = {
  reservations: [], // sve rezervacije
  reservationsForUser: [],
}

const reservationReducer = (state = initialState, action) => {
  console.log("action payload", action.payload)
  switch(action.type) {
    case 'GET_RESERVATIONS':
      state = { ...state, reservations: action.payload }
      return state
    case 'GET_RESERVATIONS_FOR_USER':
      state = { ...state, reservationsForUser: action.payload }
      return state
    case 'RATE_RESERVATION':
      state = { ...state, reservationsForUser: state.reservationsForUser.map(reservation => action.payload.id == reservation.id ? action.payload : reservation )}
      console.log("new state", state)
      return state
    default:
      return state
  }
}

export default reservationReducer