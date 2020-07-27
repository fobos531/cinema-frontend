
const initialState = {
  loggedUser: null,
  token: localStorage.getItem('userToken')
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.payload)
      // set token and user 
      localStorage.setItem('userToken', action.payload.token)
      localStorage.setItem('loggedUser', JSON.stringify(action.payload.user))
      return {...state, loggedUser: action.payload.user}
    case 'SET_ACTIVE_USER':
      return {...state, loggedUser: action.payload }
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.getItem('userToken');
      return initialState;
    default:
      return state
  }
}

export default authReducer