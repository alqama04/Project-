import { Avatar, Box, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { TiNews } from 'react-icons/ti'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'

import FreemodeSlide from '../../components/swiper/FreemodeSlide';
import './Home.css'
const Testmonials = () => {
    const testimonial = [
        {
            name: 'alqama',
            prof: "Programmer", review: "this is loremi sum doll orlor emi sum dollo rlorem isum dollorl oremi sum dollor sit ametthis is loremi sum doll orlor emi sum dollo rlorem isum dollorl oremi sum dollor sit amet alqama"
        },
        { name: 'name 1', prof: "this is porfession", review: "this is loremisum dollor sit amet" },
        { name: 'Name 2', prof: "this is porfession", review: "this is loremisum dollor sit amet" },
        { name: 'Name 2', prof: "this is porfession", review: "this is loremisum dollor sit amet" },
    ]

    let content
    content = testimonial.map(test => (
        <Box bg='#fff'
            mx='1' rounded='4' shadow='md' className='testMonial' p='4' w='full' h='320px'>
            <Flex flexDir='column' justify='center' align='center'>
                <Avatar size='xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                <Text mt='1.5' textTransform='capitalize' fontWeight='semibold'>{test.name}</Text>
                <Text fontWeight='medium' p='0'>{test.prof}</Text>
                <Box bg='orange.300' w='70px' rounded='4' h='3px' mx='auto'></Box>
                <Flex gap='1' mt='1'>
                    <Icon as={RiDoubleQuotesL} />
                    <Text fontSize='0.8em'>{test.review}</Text>
                </Flex>
                <Icon as={RiDoubleQuotesR} />
            </Flex>

        </Box>
    ))
    return (
        <React.Fragment>
            <Box bg='#f9f9f9' py='3' my='2' px='1'>
                <Box textAlign='center'>
                    <Flex align='center' justify='center' gap='2'>
                        <Icon as={TiNews} boxSize={6} color='red.600' />
                        <Heading fontSize='1.4em' fontWeight='medium'  > Testmonials </Heading>
                    </Flex>
                    <Text fontWeight='medium'> what our experts are saying... </Text>
                </Box>
                <Box mt='5'>
                    <Container p='0'>
                        <FreemodeSlide {...{ data: content, nav: true, testimonial: true }} />
                    </Container>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default Testmonials;
