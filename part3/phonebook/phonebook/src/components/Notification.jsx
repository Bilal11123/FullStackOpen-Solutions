const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const notificationClass = isError ? 'error' : 'personAdded'

  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

export default Notification