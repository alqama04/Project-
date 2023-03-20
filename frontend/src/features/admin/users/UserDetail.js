import { Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useGetUserDetailQuery } from '../../users/userApiSlice';

const UserDetail = () => {
    const { id } = useParams()
    const { data: user, isLoading, isError, error, isSuccess } = useGetUserDetailQuery(id)
    console.log(user)
    let content
    if (isLoading) {
        content = <LoadingSpinner />
    }

    if (isError) {
        content = <Text>{error.data.message}</Text>
    }

    if (isSuccess) {
        
    }

    return content
}

export default UserDetail;
