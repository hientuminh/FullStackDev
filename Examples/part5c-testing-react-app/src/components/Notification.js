import React from 'react'

const Notification = ({ message }) => {
  return (
    <div className="error">
      {!message && message}
    </div>
  )
}

export default Notification
