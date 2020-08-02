import cinemaService from '../../services/cinemas'

export const getCinemas = () => {
  return async dispatch => {
    const response = await cinemaService.allCinemas();
    dispatch({ type: 'GET_CINEMAS', payload: response})
  }
}

// ovo se trenutni nigdje ne koristi
/* export const getAvailableCinemas = () => {
  return async dispatch => {
    const response = await cinemaService.getAvailableCinemas()
  }
} */

export const addNewCinema = (cinemaData) => {
  return async dispatch => {
    const response = await cinemaService.addCinema(cinemaData);
    dispatch({type: 'ADD_NEW_CINEMA', payload: response})
  }
}

export const deleteCinema = (id) => {
  return async dispatch => {
    await cinemaService.deleteCinema(id)
    dispatch(getCinemas())
  }
}


