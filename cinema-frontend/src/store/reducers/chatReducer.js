
const initialState = {
  chat_messages: []
}

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_MESSAGE':
      state = { ...state, chat_messages: [...state.chat_messages, action.payload]}
      return state
    default:
      return state
  }
}

export default chatReducer