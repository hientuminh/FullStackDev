import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
