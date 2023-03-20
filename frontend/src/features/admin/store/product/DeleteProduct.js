import { Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { AiOutlineDelete } from 'react-icons/ai'
import { useDeleteProductMutation } from '../../../store/storeApiSlice';
import useToastMsg from '../../../../hooks/useToastMsg';

const DeleteProduct = ({ name, id }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { handleToast } = useToastMsg()
    const [deleteProduct, { isLoading }] = useDeleteProductMutation()

    const handleDelete = async () => {
        try {
            const data = await deleteProduct(id).unwrap()
            handleToast({ desc: data.message, status: "success" })

        } catch (error) {
            console.log(error)
            handleToast({ desc: error.data.message, status: "error" })
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
                    <Button variant='iconBtn' color='red.600' fontSize='1.3em' leftIcon={<AiOutlineDelete />} />
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

export default DeleteProduct;
