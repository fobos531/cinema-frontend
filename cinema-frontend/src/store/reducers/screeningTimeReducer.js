
const initialState = {
  screening_time: [] // za prikaz u admin dashboardu
}

const screeningTimeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES':
      state = { ...state, screening_times: action.payload }
      return state
    default:
      return state
  }
}

export default screeningTimeReducer