import { Box, Button,FormLabel, IconButton, Input, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrLinkNext } from 'react-icons/gr'
import useToastMsg from '../../../hooks/useToastMsg'
import { useUpdateProfileMutation } from '../userApiSlice';

const UpdateProfile = ({ name, phoneNo, id }) => {
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()
    const { handleToast } = useToastMsg()

    const [username, setUsername] = useState(name || '')
    const [phone, setPhone] = useState(phoneNo || '')


    const [password, setPassword] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleNext = () => {
        if (!username) return handleToast({ desc: "Name is required", status: "error" })
        if (!phone) return handleToast({ desc: "phone is required", status: "error" })
        if (isNaN(phone) || phone.length !== 10) return handleToast({ desc: "Enter 10 digit phone number ", status: "error" })
        onOpen()
    }

    const handleUpdate = async () => {
        if (!password) return handleToast({ desc: "Password is required", status: "error" })
        try {
            const data = await updateProfile({ id, name: username, phone, password }).unwrap()

            console.log(data)
            if (data) {
                handleToast({ desc: data.message, status: "success" })
            }
        } catch (error) {
            handleToast({ desc: error.data.message, status: 'error' })
        }
    }



    return (

        <VStack shadow='md' justify='center' bg='#fff'  w={{ base: "100%", md: "30em" }}  px='2' py='8' gap='4' mx='auto' rounded='4'>
            {!isOpen ?
                <React.Fragment>
                    <Box w='full'>
                        <FormLabel>Full Name</FormLabel>
                        <Input type='text' variant='formInput' placeholder='Enter name' value={username} onChange={e => setUsername(e.target.value)} />
                    </Box>
                    <Box w='full'>
                        <FormLabel>Phone</FormLabel>
                        <Input type='number' variant='formInput' placeholder='Enter phone' value={phone} onChange={e => setPhone(e.target.value)} />
                    </Box>
                    <Box w='full' textAlign='right'>
                        <IconButton onClick={handleNext} border='1px' borderColor='gray.200' rounded='full' fontSize='1.3em' shadow='md' icon={<GrLinkNext />}
                        />
                    </Box>
                </React.Fragment>
                : <React.Fragment>

                    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
                        <ModalOverlay
                            bg='none'
                            backdropFilter='auto'
                            backdropInvert='80%'
                            backdropBlur='2px'
                        />
                        <ModalContent>

                            <ModalBody p='2.5' bg='#fff'>
                                <Box w='full'>
                                    <FormLabel>Password</FormLabel>
                                    <Input type='password' variant='formInput' placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                                </Box>
                                <Button my='4' isLoading={isLoading} variant='solid' w='full' onClick={handleUpdate}>update</Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </React.Fragment>

            }

        </VStack>

    );
}

export default UpdateProfile;
