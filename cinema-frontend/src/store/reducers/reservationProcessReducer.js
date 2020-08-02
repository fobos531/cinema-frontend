
const initialState = {
  seatsForSelectedScreeningTime: [], // tu dohvaćamo sjedala za odabrano kino
  selectedCinema: null,
  selectedMovie: null,
  currentReservation: {
    screeningTime_id: null,
    user_id: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')).id : null,
    seats: [],
    totalPrice: 0,
  }, // objekt koji drzi informacije o rezervaciji
}

const reservationProcessReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_SEATS_FOR_SELECTED_SCREENING_TIME':
    case 'SET_OCCUPIED_SEATS':
      state = { ...state, seatsForSelectedScreeningTime: action.payload }
      return state
    case 'SET_PICKED_SEATS':
      state = { ...state, currentReservation: {...state.currentReservation, seats: action.payload } }
      return state
    case 'SET_SELECTED_CINEMA':
      state = { ...state, selectedCinema: action.payload }
      return state
    case 'SET_SELECTED_SCREENING_TIME': 
      state = { ...state, currentReservation: {...state.currentReservation, screeningTime_id: action.payload } }
      return state
    case 'SET_SELECTED_MOVIE': 
      state = { ...state, selectedMovie: action.payload }
      return state
    case 'UPDATE_TOTAL_PRICE':
      state = { ...state, currentReservation: {...state.currentReservation, totalPrice: action.payload } }
      return state
    case 'SET_ORDER_ID':
      state = { ...state, currentReservation: {...state.currentReservation, paypalOrderId: action.payload } }
      return state
    default:
      return state
  }
}

export default reservationProcessReducer