

const initialState = {
  cinemas: [],
  availableCinemas: [], // za korištenje u booking pageu
}; // initial state su prazni cinemas

const cinemaReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CINEMAS':
    case 'GET_AVAILABLE_CINEMAS':
      // od actiona bum dobil cinemas i tu bum ih onda v state postavil
      state = { ...state, cinemas: action.payload }
      return state
    case 'ADD_NEW_CINEMA':
      state = { ...state, cinemas: [...state.cinemas.concat(action.payload)] }
      return state
    default:
      return state
  }
}

export default cinemaReducer