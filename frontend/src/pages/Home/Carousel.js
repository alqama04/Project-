import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import ImageCarousel from '../../components/swiper/ImageCarousel';

const Carousel = () => {
    return (
        <React.Fragment>
            <Box bg='#fff' py='2'>
                <Container maxW={{ base: '100%', md: '90%' }} p='0' mt={{ base: '1.7em', sm: "0" }}>
                    <Box h={{ base: '18em', sm: "25em", md: "30em" }} p='1'>
                        <Box h='100%' cursor='pointer' shadow='md'>
                            <ImageCarousel />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}


export default Carousel;
