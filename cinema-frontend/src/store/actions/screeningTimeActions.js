import screeningTimeService from '../../services/screeningTime'

export const getScreeningTimes = () => {
  return async dispatch => {
    const response = await screeningTimeService.allScreeningTimes();
    dispatch({ type: 'GET_SCREENING_TIMES', payload: response})
  }
}

export const addNewScreeningTime = (newScreeningTime) => {
  return async dispatch => {
    console.log(newScreeningTime)
    await screeningTimeService.addScreeningTime(newScreeningTime);
   // dispatch(getScreeningTimes())
  }
}

export const deleteScreeningTime = (id) => {
  return async dispatch => {
    await screeningTimeService.deleteScreeningTime(id)
    dispatch(getScreeningTimes())
  }
}


