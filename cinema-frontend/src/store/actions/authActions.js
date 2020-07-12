import loginService from '../../services/login'

export const loginUser = (loginInfo) => {
  return async dispatch => {
    const response = await loginService.login(loginInfo);
    console.log(response)
    if (response.error) { // failed login
      dispatch({ type: 'LOGIN_FAIL', payload: response });
    } else {
      // successfully logged in
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    }
  }
}

