
const initialState = {
  movies: [] // za prikaz u admin dashboardu
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES':
      state = { ...state, movies: action.payload }
      return state
    default:
      return state
  }
}

export default userReducer