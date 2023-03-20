import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import FallackLoading from '../../components/fallback/FallackLoading';

const LazyFlashDeals = React.lazy(() => import('./FlashDeals'))
const LazyCarousel = React.lazy(() => import('./Carousel'))
const LazyTopCategories = React.lazy(() => import('./TopCategories'))
const LazyInDemand = React.lazy(() => import('./InDemand'))
const LazyTestimonials = React.lazy(() => import('./Testmonials'))

const Home = () => {
    return (
        <React.Fragment>
            <Box>

                <React.Suspense fallback={
                    <FallackLoading {...{ box: 1, w: "full" }} />
                }>
                    <LazyCarousel />
                </React.Suspense>


                <Container maxW={{ base: '100%', md: '95%' }} p='0'>
                    <React.Suspense fallback={
                        <FallackLoading {...{ box: 4, w: "200px" }} />
                    }>
                        <LazyFlashDeals />
                    </React.Suspense>

                    <React.Suspense fallback={
                        <FallackLoading {...{ box: 4, w: '200px' }} />
                    }>
                        <LazyTopCategories />
                    </React.Suspense>



                    <React.Suspense fallback={
                        <FallackLoading {...{ box: 4, w: '200px' }} />
                    }>
                        <LazyInDemand />
                    </React.Suspense>

                    <React.Suspense fallback={
                        <FallackLoading {...{ box: 4, w: '200px' }} />
                    }>
                        <LazyTestimonials />
                    </React.Suspense>


                </Container>
            </Box>
        </React.Fragment>
    );
}

export default Home;
