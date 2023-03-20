import React from 'react';
import { useGetProductsQuery } from '../storeApiSlice';
import { Box, Flex, Text } from '@chakra-ui/react';
import Products from './Products';
import { useLocation } from 'react-router-dom';
import FallackLoading from '../../../components/fallback/FallackLoading';

const ProductList = () => {
    const { search } = useLocation()

    const { data: products, isLoading, isError, error, isSuccess } = useGetProductsQuery(search)

    let content

    if (isLoading) {
        content = <FallackLoading {...{ box: 4, w:'220px',h:"300px"}} />
    }
    if (isError) {
        content = <Flex justify='center' align='center' h='100vh' w='full'>{error.data.message}</Flex>
    }


    if (isSuccess) {
        content = <Products {...{ products }} />
    }

    return (
        <Box mt={{ base: '10', sm: '0.5', lg: '0' }} mb='4'>
            <Flex>
                <Box px={{ base: '1', sm: '3', md: '2' }} flex='1'>
                    <Text fontSize='.8em' fontWeight='medium' my='2'>Showing result for <i>{search}</i></Text>
                    {content}
                </Box>
            </Flex>
        </Box>
    );
}

export default ProductList;
