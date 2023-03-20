import React from 'react';
import { Box, Button, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
const OrderConfirmation = () => {
    return (
        <Box mt='4'>
            <Box py='4' bg='#fff'>
                <Box mx='auto' p='2' rounded='4'>
                    <Heading fontWeight='semibold' fontSize='1.3em'>Order Confirmation</Heading>

                    <Box bg='gray.100' p='2.5' rounded='2'>
                        <Text fontWeight='medium' fontSize='0.6em' textAlign='center' color='gray.600'>Secure Payment | Guranteed Result</Text>
                        <Box bg='#fff' my='1' mb='2.5' p='3' rounded='8' shadow='md' border='1px' borderColor='gray.200'>
                            <HStack justify='space-between'>
                                <Text fontWeight='semibold' fontSize='0.9em'>Home Delivery</Text>
                                <Button fontWeight='medium' fontSize='0.8em' color='green.400'>Change address</Button>
                            </HStack>
                            <Box>
                                <Text fontWeight='medium' fontSize='0.9em'>Alqama</Text>
                                <Text mt='1' fontWeight='medium' color='gray.600' fontSize='0.8em'>
                                    ordchid green Apartment flat No.101,this is locality ,this landMark,
                                    this is city, Lucknow, u.p - 2260222</Text>
                                <Text mt='1' fontWeight='normal' fontSize='0.9em'>Phone : <Text fontWeight='medium' color='gray.600' as='span'>8948661183</Text></Text>
                            </Box>
                        </Box>
                    </Box>


                    <Box p='2'>
                        <HStack justify='space-between'>
                            <Text fontWeight='semibold'>Expected Delivery</Text>
                            <Text>4th - 6th Mar</Text>
                        </HStack>
                    </Box>

                </Box>

            </Box>


        </Box>
    );
}

export default OrderConfirmation;
