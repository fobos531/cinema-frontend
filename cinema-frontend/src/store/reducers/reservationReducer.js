/* eslint-disable no-fallthrough */

const initialState = {
  reservations: [], // sve rezervacije
  reservationsForUser: [],
}

const reservationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_RESERVATIONS':
      state = { ...state, reservations: action.payload }
      return state
    case 'GET_RESERVATIONS_FOR_USER':
      state = { ...state, reservationsForUser: action.payload }
    default:
      return state
  }
}

export default reservationReducer