import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure } from '@chakra-ui/react';
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import React, { useState } from 'react';
import { useUpdateCategoryMutation } from '../../store/storeApiSlice';
import ToastMsg from '../../../hooks/useToastMsg'
import LoadingSpinner from '../../../components/LoadingSpinner';

const UpdateCategory = ({ name, img, id }) => {
    const { handleToast } = ToastMsg()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [catName, setName] = useState(name)
    const [images, setImages] = useState([])
    const [publicId, setPublicId] = useState([])

    const [updateCategory, { isLoading }] = useUpdateCategoryMutation()

    const handleCheckImg = (e) => {

        if (publicId.includes(e.target.value)) {
            let filterId = publicId.filter(id => id !== e.target.value)

            setPublicId(filterId)
        } else {
            setPublicId(oldArray => [...oldArray, e.target.value])
        }
    }


    const handleUpdate = async () => {
        let formData = new FormData()
        formData.append('name', catName)
        Array.from(publicId).forEach(ids => { formData.append("publicId", ids) })
        Array.from(images).forEach(image => { formData.append("files", image) });
        try {
            const data = await updateCategory({ formData, id }).unwrap()
            if (data) {
                handleToast({ desc: data.message, status: "success" })
            }

        } catch (error) {
            handleToast({ desc: error.data.message, status: "error" })
        }
    }


    const content = <React.Fragment><SimpleGrid columns='1' gap='4'>
        <FormControl>
            <FormLabel variant='absoluteLabel'>Name</FormLabel>
            <Input type='text' variant='formInput' placeholder='category name' value={catName} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl mt='1'>
            <FormLabel variant='absoluteLabel'>Image</FormLabel>
            <Input type='file' variant='formInput'
                placeholder='select Images' onChange={e => setImages(e.target.files)} multiple accept="image/png, image/jpeg image/jpg" />
        </FormControl>

    </SimpleGrid>

        <SimpleGrid columns={2} gap='2' mt='2'>
            {img.length ?
                img.map(picture => (
                    <Flex flexDir='column-reverse' key={picture.url} border='1px' borderColor='gray.200' shadow='md'>
                        <Checkbox pos='relative' colorScheme='red' value={picture.public_id} onChange={handleCheckImg} fontWeight='meduim'>remove </Checkbox>
                        <Image bg='blackAlpha.50' mx='auto' objectFit='contain' src={picture.url} />
                    </Flex>
                ))
                : "No image found"
            }
        </SimpleGrid>
    </React.Fragment>

    return (
        <Box>
            <Button variant='blackBtn' py='1.1em' onClick={onOpen}>Edit</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        {content}
                    </ModalBody>
                    <ModalFooter >
                        {isLoading ? <Flex justify='center'><LoadingSpinner /></Flex>
                            :
                            <React.Fragment>
                                <Button onClick={handleUpdate} py='4' mr='2.5' variant='solid'>update</Button>
                                <Button onClick={onClose} py='4' variant='solid'>cancel</Button>
                            </React.Fragment>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default UpdateCategory


