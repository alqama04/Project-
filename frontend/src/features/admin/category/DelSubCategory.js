import { Button, Flex, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ToastMsg from '../../../hooks/useToastMsg';
import { useDeleteSubCategoryMutation } from '../../store/storeApiSlice';

const DelSubCategory = ({ cateId, subCatId, subCatName }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { handleToast } = ToastMsg()
    const [deleteSubCategory, { isLoading }] = useDeleteSubCategoryMutation()

    const handleDelete = async () => {

        try {
            const data = await deleteSubCategory({ cateId, subCatId, subCatName }).unwrap()
            if (data) {
                handleToast({ desc:data.message, status: 'success' })
            }

        } catch (error) {
            handleToast({ desc: error.data.message, status: 'error' })
            onClose()
        }
    }
    return (
        <React.Fragment>


            <Popover isLazy={true}
                placement='left'
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <IconButton px='2'
                        fontWeight='semibold'
                        fontSize='1.2em'
                        size=''
                        color='red.600'
                        icon={<AiOutlineDelete />}
                    />
                </PopoverTrigger>
                <PopoverContent w='max-content' mr='-2' borderColor='gray.300' rounded='2' _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverHeader>Click Confirm To delete {subCatName}</PopoverHeader>
                    <PopoverBody shadow='lg'>
                        {isLoading ?
                            <Flex justify='center'>
                                <LoadingSpinner />
                            </Flex>

                            : <Flex justify='space-between' gap='3' py='2'>

                                <Button variant='blackBtn' fontSize='.8em' py='1em' onClick={onClose}>
                                    cancel
                                </Button>

                                <Button variant='blackBtn' fontSize='.8em' py='1em' onClick={handleDelete}>
                                    confirm
                                </Button>
                            </Flex>
                        }
                    </PopoverBody>
                </PopoverContent>
            </Popover>


        </React.Fragment>
    );
}

export default DelSubCategory;
