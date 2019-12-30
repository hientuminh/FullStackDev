
const notificationReducer = (state = '' , action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTFICATION':
      return `you added new note with '${action.data.content}'`
    case 'UPVOTE_NOTFICATION':
      return `you voted '${action.data.content}'`
    case 'REMOVE_NOTFICATION':
      return ''
    default:
      return state
  }
  return state
}

export const createNewNotification = (content) => {
  return {
    type: 'ADD_NEW_NOTFICATION',
    data: { content }
  }
}

export const upVoteNotification = (content) => {
  return {
    type: 'UPVOTE_NOTFICATION',
    data: { content }
  }
}

export const deleteNotification = () => {
  return {
    type: 'REMOVE_NOTFICATION',
    data: ''
  }
}

export default notificationReducer
