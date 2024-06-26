import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const setNotification = (text, timeout) => {
    return dispatch => {
        dispatch(notification(text))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout*1000)
    }
}

export const { notification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer