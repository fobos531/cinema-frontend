

const initialState = {
  cinemas: []
}; // initial state su prazni cinemas

const cinemaReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CINEMAS':
      // od actiona bum dobil cinemas i tu bum ih onda v state postavil
      state = { ...state, cinemas: action.payload }
      return state
    default:
      return state
  }
}

export default cinemaReducer