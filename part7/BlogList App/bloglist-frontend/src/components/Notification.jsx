import { useSelector } from 'react-redux'
import { Alert, Box } from '@mui/material'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification.message || notification.message.length === 0) {
        return null
    }

    return (
        <Box sx={{ my: 2 }}>
        <Alert
            severity={notification.isError ? 'error' : 'success'}
            variant="filled"
        >
            {notification.message}
        </Alert>
        </Box>
    )
}

export default Notification
