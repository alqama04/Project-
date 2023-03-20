import { Box, Heading, Icon, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs'
const PageNotFound = () => {
    return (
        <Box>
            <VStack justify='center' align='center' h='90vh'>
                <Box textAlign='center' shadow='lg' rounded='1xl' py='8' px='2' bg='gray.50'>
                    <Icon as={BsEmojiSmile} boxSize='20' color='go' />
                    <Heading fontSize='2xl' color='gray.700'>You've found the page that doesn't exist</Heading>
                    </Box>
            </VStack>
        </Box >
    );
}

export default PageNotFound;
