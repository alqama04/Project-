import { Box, Container, Flex, HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useVerifyTokenMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useParams } from 'react-router-dom'

const VerifyOtp = () => {
    const dispatch = useDispatch()
  

    return (
        <Box h='80vh' px='1.5' bg='#fff' mt={{ base: '2.2em', sm: '-7px', lg: '0' }} overflow='hidden'>
            <VStack h='full' justifyContent={'flex-start'}>
                <HStack justify='center' align='center' mt='5' p='1'>
                    <PinInput autoFocus={true}
                        focusBorderColor='#f9f9f9'
                        variant=''
                        errorBorderColor={'red.600'}
                        isInvalid={false} otp={true}
                        
                        type='number'>
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                        <PinInputField shadow='lg' bg='gray.100' border='2px' borderColor='#fff' />
                    </PinInput>
                </HStack>

                <Text>2:1</Text>

            </VStack>
        </Box>

    );
}

export default VerifyOtp;
