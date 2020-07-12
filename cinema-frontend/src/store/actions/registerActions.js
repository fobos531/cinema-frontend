import userService from '../../services/users'

export const registerUser = (newUser) => {
  return async dispatch => {
    const response = await userService.register(newUser);
    console.log(response)
    // successfully registered
    dispatch({ type: 'REGISTER_SUCCESS', payload: response });
  }
}

