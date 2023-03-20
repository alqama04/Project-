import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    persist: JSON.parse(localStorage.getItem('persist')) || false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        setPersist: (state, action) => {
            state.persist = action.payload
            state.persist = JSON.stringify(localStorage.setItem('persist', action.payload))
        },
        logout: (state, action) => {
            state.token = null
            state.persist = localStorage.removeItem("persist");
        }

    }
})

export const { setCredentials, setPersist, logout } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token

export const selectPersist = (state) => state.auth.persist
