import React from 'react'
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const messgage = props.store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (messgage !== '') {
    setTimeout(() => {
      props.store.dispatch(deleteNotification())
    }, 5000)

    return (
      <div style={style}>
        {messgage}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification
