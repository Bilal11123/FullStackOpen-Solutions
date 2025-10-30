import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if (notification.message.length === 0) {
        return null
    }
    const notificationClass = notification.isError ? 'error' : 'personAdded'

    return <div className={notificationClass}>{notification.message}</div>
}

export default Notification
