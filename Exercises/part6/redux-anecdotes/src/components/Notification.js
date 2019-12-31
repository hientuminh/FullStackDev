import React from 'react'
import { connect } from 'react-redux'
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const messgage = props.notification
  if (messgage.length > 0) {
    setTimeout(() => {
      props.deleteNotification()
    }, 10000)
  }

  const display_status = (messgage.length > 0) ? '': 'none'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: display_status
  }
  return (
    <div style={style}>
      {messgage.map((m, index) => <li key={index}>{m}</li>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  deleteNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
