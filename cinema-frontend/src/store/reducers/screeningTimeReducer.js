
const initialState = {
  screening_times: [], // za prikaz u admin dashboardu
  availableScreeningTimes: [],
}

const screeningTimeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_SCREENING_TIMES':
    case 'GET_AVAILABLE_SCREENING_TIMES':
      state = { ...state, screening_times: action.payload }
      return state
    default:
      return state
  }
}

export default screeningTimeReducer