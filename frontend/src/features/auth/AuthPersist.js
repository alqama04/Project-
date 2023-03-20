import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectPersist, setCredentials } from './authSlice'
import { useDispatch } from 'react-redux'
import { useRefreshMutation } from './authApiSlice'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import SessionExp from '../../pages/SessionExp';
import { Flex } from '@chakra-ui/react';
const AuthPersist = () => {
    const dispatch = useDispatch()
    const effectRan = useRef(false)
    const token = useSelector(selectCurrentToken)
    const persist = useSelector(selectPersist)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    const data = await refresh()
                    const { accessToken } = data.data
                    dispatch(setCredentials({ accessToken }))

                    setTrueSuccess(true)
                } catch (error) {

                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
        //eslint-disable-next-line 
    }, [])

    let content
    if (!persist) {
        content = <Outlet />
    } else if (isLoading) { // persist:yes , token:no
        content = ''

    } else if (isError) { // persist:yes, token:no
        return <SessionExp />

    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) { //persist yes toke:yes
        content = <Outlet />
    }

    return content
}

export default AuthPersist;
