import React from 'react';
import { useProfileQuery } from '../userApiSlice';

import UseAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Flex, VStack } from '@chakra-ui/react';
import UpdateProfile from './UpdateProfile'
const UserProfile = () => {
    const { id } = UseAuth()
    const { data, isSuccess, isLoading, isError, error } = useProfileQuery(id)

    let content = ''
    if (isLoading) content = <Flex justify='center' align='center'>{<LoadingSpinner />}</Flex>
    if (isError) content = <Flex justify='center' align='center'>{error.data.message}</Flex>
    if (isSuccess) {
        content = <UpdateProfile {...{ id, name: data.user.name, phoneNo: data.user.phone }} />
    }


    return (
        <VStack justify='center' h='80vh' p='2'>

            {content}

        </VStack>
    )
}

export default UserProfile;
