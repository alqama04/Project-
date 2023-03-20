import { Box, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useDeleteCartMutation } from './CartApiSlice';

const DeleteCart = ({ id }) => {

    const [deleteCart, { isLoading }] = useDeleteCartMutation()
    const [errMsg,setErrMsg] = useState('')
    const handleDelete = async()=>{
        try {
            const data =await deleteCart({id}).unwrap()
            console.log(data)
        } catch (error) {
            setErrMsg(error.data.message)
        }

    }
    return (
        <>
            <Box textAlign='right' flex='1'>
                {isLoading ? <LoadingSpinner /> :
                    <IconButton
                        title='remove'
                        color='star'
                        fontSize='1.2em'
                        icon={<AiFillDelete />}
                        onClick={handleDelete}
                        />
                }
            </Box>

        </>
    );
}

export default DeleteCart;
