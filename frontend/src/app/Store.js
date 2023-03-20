import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import storeReducer from '../features/store/StoreSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        myStore: storeReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true
})


setupListeners(store.dispatch)