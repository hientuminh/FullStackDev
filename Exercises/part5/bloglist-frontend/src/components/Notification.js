import React from 'react'

const Notification = ({ message }) => {
  if (message.content === '') {
    return null
  }
  const className = (message.type === 'error') ? 'error' : 'success'
  return (
    <div className={className}>
      {message.content}
    </div>
  )
}

export default Notification
