import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
        initialState: {
            message: '',
            isError: false
        },
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return {message: '', isError: false}
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Thunk-like function for timed notifications
export const notificationChange = (message, isError, seconds = 5) => {
    return (dispatch) => {
        dispatch(setNotification({message: message, isError: isError}))
        setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer