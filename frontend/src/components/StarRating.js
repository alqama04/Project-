import { Box, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
const StarRating = ({ rating, size, color }) => {


    const ratingStar = Array.from({ length: 5 }, (_, index) => {
        let number = index + 0.5
        return <Box key={index} flexDir='row' color={color||'star'}>
            {
                rating >= index + 1 ?
                    <Icon as={BsStarFill} boxSize={size || 5} /> : rating >= number ?
                        <Icon as={BsStarHalf} boxSize={size || 5} /> :
                        <Icon as={BsStar} boxSize={size || 5} />
            }
        </Box>
    })

    return <Flex align='center'>{ratingStar}</Flex>
}

export default StarRating;
