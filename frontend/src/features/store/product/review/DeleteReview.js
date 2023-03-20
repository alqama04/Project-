import { Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { useDeleteReviewMutation } from '../../storeApiSlice';
import LoadingSpinner from '../../../../components/LoadingSpinner'

const DeleteReview = ({ revId, userId, prodId }) => {

    const [deleteReview, { isLoading }] = useDeleteReviewMutation()
    const handleDelete = async () => {
        try {
            await deleteReview({ revId, userId, prodId }).unwrap()
        } catch (error) {

        }
    }
    return (
        <Box>
            <Popover isLazy={true} placement='right'>
                <PopoverTrigger>
                    <Button  fontSize='1.7em' mt='-2' leftIcon={<BiDotsVerticalRounded />} />
                </PopoverTrigger>
                <PopoverContent w='max-content' mr='-2' borderColor='gray.300' rounded='2' _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverHeader>Delete Review</PopoverHeader>
                    <PopoverBody shadow='lg'>
                        <Flex justify='center'>
                            {isLoading ? <LoadingSpinner />
                                :
                                <Button color='red.700' fontSize='1.7em' mt='-2' title='delete' onClick={handleDelete} leftIcon={<MdDeleteForever />} />
                            }
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
}

export default DeleteReview;
