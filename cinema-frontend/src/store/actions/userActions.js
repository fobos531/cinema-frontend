import userService from '../../services/users'

export const saveUserChanges = (updatedUserDetails) => {
  return async dispatch => {
    const response = await userService.updateUser(updatedUserDetails);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: response})
  }
}



