import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const LazyShippingInfo = React.lazy(() => import('../users/shippingInfo/ShippingInfo'))
const Checkout = () => {

    return (
        <Box>
            <React.Suspense fallback='laodin'>
                <LazyShippingInfo />
            </React.Suspense>

            <Flex gap='2' border='solid'>
                dsafa
            </Flex>
        </Box>
    );
}

export default Checkout;
