import { Box, Flex } from '@chakra-ui/react';
import React, { memo } from 'react';
import './FallbackLoading.css'

const FallackLoading = ({ box, w, h }) => {
    return (
        <Box p='1'>
            <Flex w='full' flexWrap='wrap' gap='5' justify='center' p='1' >
                {
                    Array.from({ length: box }, (_, index) => {
                        return <Box w={w || 'full'} h={h || '200px'} rounded='4' className='fallback' key={index}></Box>
                    })
                }
            </Flex >
        </Box >
    );
}

const FallackLoadingMemo = memo(FallackLoading)
export default FallackLoadingMemo;
