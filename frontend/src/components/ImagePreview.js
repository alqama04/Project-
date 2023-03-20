import { Box, Flex,Image } from '@chakra-ui/react';
import React, { useState } from 'react';

const ImagePreview = ({img}) => {
    
console.log(img)
    
    return (
        <Box>
            <Flex justify='center'>
            <Image src={img[0]} />
            </Flex>
        </Box>
    );
}

export default ImagePreview;
