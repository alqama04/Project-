import { Box, Button, Text, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ImagePreview from '../../../components/ImagePreview'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useAddCategoryMutation } from '../../store/storeApiSlice';

const AddCategory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const [name, setName] = useState('')
    const [images, setImages] = useState([])
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')


    useEffect(() => {
        setErrMsg('')
        setSuccessMsg('')
    }, [name, images])

    const handleCategory = async () => {
        let formData = new FormData()
        formData.append('name', name)
        Array.from(images).forEach(image => {
            formData.append("files", image);
        });
        try {
            const { message } = await addCategory(formData).unwrap()
            setSuccessMsg(message)
        } catch (error) {
            setErrMsg(error.data.message)
        }
    }

    const content = <SimpleGrid columns='1' gap='4'>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type='text' variant='formInput' placeholder='category name' value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl mt='1'>
            <FormLabel p='0' m='0' fontSize='1em' pl='1'>Images</FormLabel>
            <Input type='file' variant='formInput'
                placeholder='select Images' onChange={e => setImages(e.target.files)}
                multiple accept="image/png, image/jpeg image/jpg" />
        </FormControl>
    </SimpleGrid>
    return (
        <Box>
            <Button variant='blackBtn' onClick={onOpen}>Add Category</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        {errMsg ? <Text textTransform='capitalize' textAlign='center' fontSize='0.7em' mb='1.5' color='red.500'>{errMsg}</Text> :
                            successMsg ? <Text textTransform='capitalize' textAlign='center' fontSize='0.7em' mb='1.5' color='green.500'>{successMsg}</Text> : ""
                        }
                        {content}
                    </ModalBody>

                    <ModalFooter >
                        {!isLoading ?
                            <Button variant='blackBtn' py='4' mr='4' w='-webkit-max-content' px='3' onClick={handleCategory}>Save</Button>

                            : <Button variant='blackBtn' py='4' mr='4' w='-webkit-max-content' px='3'><LoadingSpinner color={'#fff'} /></Button>
                        }
                        <Button onClick={onClose} py='4' variant='blackBtn'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AddCategory;
