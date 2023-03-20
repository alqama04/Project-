import { store } from '../../app/Store'
import { usersApiSlice } from '../users/userApiSlice'
import { storeApiSlice } from '../store/storeApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
    useEffect(() => {
        
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(storeApiSlice.util.prefetch('getProducts', 'ProductsList', { force: true }))

    })
    return <Outlet />
}

export default Prefetch;
