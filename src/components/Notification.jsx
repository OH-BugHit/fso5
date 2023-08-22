const Notification = ({ message }) => {
  console.log(`Notificaatiossa ${message}`)
  if (message.message === null) {
    return null
  }

  return (
    <div className={message.messageType}>
      {message.message}
    </div>
  )
}

export default Notification