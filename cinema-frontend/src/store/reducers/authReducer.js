
const initialState = {
  loggedUser: {},
  token: localStorage.getItem('userToken')
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action.payload)
      // set token and user 
      localStorage.setItem('userToken', action.payload.token)
      return {...state, user: action.payload.user}
    
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.getItem('userToken');
      return initialState;
    default:
      return state
  }
}

export default authReducer