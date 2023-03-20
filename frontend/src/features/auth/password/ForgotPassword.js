import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../authApiSlice';
import useToastMsg from '../../../hooks/useToastMsg';


const ForgotPassword = () => {
    const { handleToast } = useToastMsg()

    const [phone, setPhone] = useState('')
    const [forgortPassword, { isLoading }] = useForgotPasswordMutation()



    const sendOtp = async () => {
        if (!phone) return handleToast({ desc: "Phone No. is required", status: "error" })
        try {
            const data = await forgortPassword({ phone }).unwrap()
            if (data) {
                handleToast({ desc: data.message, status: "success" })
            }
        } catch (error) {
            handleToast({ desc: error.data.message, status: "error" })
        }
    }
    return (
        <VStack justify='center' p='2' h='80vh'>
            <Box bg='#fff' rounded='4' shadow='md' w={{ base: "100%", sm: "90%", md: "30em" }} px='3' py='4'>
                <FormControl my='3'>
                    <FormLabel fontWeight='normal' m='0' fontSize='1em' pl='1'>Phone</FormLabel>
                    <Input type='number' variant='formInput' placeholder='Registered mobile No.' value={phone} onChange={e => setPhone(e.target.value)} />
                </FormControl>

                <Button my='3' isLoading={isLoading} variant='solid' w='full' onClick={sendOtp}>get password reset link </Button>

            </Box>
        </VStack>
    );
}

export default ForgotPassword;
