import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth'
const ShippingInfo = () => {
    const { id } = useAuth
    const [First, setFirstName] = useState('')
    const [lastName, setvirstName] = useState('')
    const [email, setEmail] = useState('')

    const [address, setAddress] = useState('')
    const [locality, setLocality] = useState('')
    const [landMark, setLandmark] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPinCode] = useState('')
    const [Country, setCountry] = useState('India')
    const formLabel = {
        pos: 'absolute', zIndex: '1', ml: '1', fontSize: '.9em', fontWeight: "normal"
    }
    
    return (
        <Flex justify='center' align='center' h='90vh' bg='#fff' py='2em' mx='auto' p='1'>

            <Box w='40em' p='2' mx='auto' shadow='md'>
                <Heading fontWeight='bold' fontSize='1.3em'>Shipping</Heading>
                <Text>Please enter your shipping details</Text>
                 
                
                <form>
                    <Flex mt='3em' gap='2'>
                        <FormControl>
                            <FormLabel variant={'absoluteLabel'}>First Name</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                        <FormControl>
                            <FormLabel variant={'absoluteLabel'}>Last Name</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                    </Flex>
                    <Flex mt='2' gap='2'>
                        <FormControl>
                            <FormLabel variant={'absoluteLabel'}>Phone No.</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                        <FormControl>
                            <FormLabel variant={'absoluteLabel'}>Email</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                    </Flex>


                   
                    <FormControl mt='2'>
                        <FormLabel variant={'absoluteLabel'}>Flat no / Building Name</FormLabel>
                        <Input variant='formInput' />
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel variant={'absoluteLabel'}>Locality / Area / Street </FormLabel>
                        <Input variant='formInput' />
                    </FormControl>
                    <FormControl mt='2'>
                        <FormLabel variant={'absoluteLabel'}>Landmark</FormLabel>
                        <Input variant='formInput' />
                    </FormControl>
                    <Flex gap='2' mt='2'>
                        <FormControl>
                            <FormLabel variant={'absoluteLabel'}>Pincode</FormLabel>
                            <Input type='number' variant='formInput' />
                        </FormControl>

                        <FormControl >
                            <FormLabel variant={'absoluteLabel'}>City</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                    </Flex>
                    <Flex mt='2' gap='2'>
                        <FormControl >
                            <FormLabel variant={'absoluteLabel'}>State</FormLabel>
                            <Input variant='formInput' />
                        </FormControl>
                        <FormControl>
                            <FormLabel variant='absoluteLabel'>Country</FormLabel>
                            <Input variant='formInput' value={Country} readOnly cursor='not-allowed ' />
                        </FormControl>
                    </Flex>
                    <Button mt='2em' type='submit' w='full' variant='solid'>Continue</Button>
                </form>
            </Box>
        </Flex >
    );
}

export default ShippingInfo;
