import { Button, Popover, Flex, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeleteCategoryMutation } from '../../store/storeApiSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ToastMsg from '../../../hooks/useToastMsg'

const DelCategory = ({ name, id }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { handleToast } = ToastMsg()

    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()

    const handleDelete = async () => {
        try {
            const data = await deleteCategory(id).unwrap()
            console.log(data)
            handleToast({ desc: data.message, status: 'success' })
        } catch (error) {
            handleToast({ desc: error.data.message, status: 'error' })
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
                    <Button  color='red.600' fontSize='1.6em' mt='-0.5' leftIcon={<AiOutlineDelete />} />
                </PopoverTrigger>
                <PopoverContent w='max-content' mr='-2' borderColor='gray.300' rounded='2' _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverHeader>Click Confirm To delete {name}</PopoverHeader>
                    <PopoverBody shadow='lg'>
                        {isLoading ?
                            <Flex justify='center'>
                                <LoadingSpinner />
                            </Flex>

                            : <Flex justify='space-between' gap='3' py='2'>
                            
                            <Button variant='blackBtn' fontSize='.9em' py='1.3em' onClick={onClose}>
                            cancel
                            </Button>
                            <Button variant='blackBtn' fontSize='.9em' py='1.3em' onClick={handleDelete}>
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

export default DelCategory;
