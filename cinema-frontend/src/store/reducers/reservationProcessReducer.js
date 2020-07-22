
const initialState = {
  seatsForSelectedCinema: [], // tu dohvaćamo sjedala za odabrano kino
}

const reservationProcessReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_SEATS_FOR_SELECTED_CINEMA':
    case 'SET_OCCUPIED_SEATS':
      state = { ...state, seatsForSelectedCinema: action.payload}
      return state
    default:
      return state
  }
}

export default reservationProcessReducer