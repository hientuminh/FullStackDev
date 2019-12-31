
const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTFICATION':
      return state.concat(action.data.content)
    case 'UPVOTE_NOTFICATION':
      return state.concat(`you voted '${action.data.content}'`)
    case 'REMOVE_NOTFICATION':
      const new_state = [...state]
      new_state.shift()
      return new_state
    default:
      return state
  }
  return state
}

export const createNewNotification = (content, time) => {
  return dispatch => {
    dispatch({type: 'ADD_NEW_NOTFICATION',data: { content: content }})
    setTimeout(() => { dispatch({type: 'REMOVE_NOTFICATION'}) } , 5000)
  }
}

export const upVoteNotification = (content) => {
  return dispatch => {
    dispatch({type: 'UPVOTE_NOTFICATION',data: { content: content }})
    setTimeout(() => { dispatch({type: 'REMOVE_NOTFICATION'}) } , 5000)
  }
}

export const deleteNotification = () => {
  return {
    type: 'REMOVE_NOTFICATION',
    data: ''
  }
}

export default notificationReducer
