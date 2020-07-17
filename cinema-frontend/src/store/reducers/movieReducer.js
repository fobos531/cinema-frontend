/* eslint-disable no-fallthrough */

const initialState = {
  movies: [], // za prikaz u admin dashboardu
  randomMovie: null, //objekt koji drzi random moviea
  selectedMovie: null, // film oko kojeg se trenutno flow vrti
}

const movieReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES':
      state = { ...state, movies: action.payload }
      return state
    case 'GET_RANDOM_MOVIE':
      state = { ...state, randomMovie: action.payload }
      return state
    case 'GET_MOVIE_BY_ID':
      state = { ...state, selectedMovie: action.payload}
      return state
    default:
      return state
  }
}

export default movieReducer