import React from 'react';
import { useGetProductsQuery } from '../../../store/storeApiSlice';
import { Badge, Box, Divider, Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import SearchBox from '../../../../components/header/SearchBox'
import { useNavigate } from 'react-router-dom';
import Navigations from '../../../../components/Navigations';
import './store.css'
import DeleteProduct from './DeleteProduct';
const LazyUpdate = React.lazy(() => import('./UpdateProduct'));

const Products = () => {
    const navigate = useNavigate()
const { data: products, isLoading, isError, error, isSuccess } = useGetProductsQuery()
    let content

    if (isLoading) {
        content = <Tr>
            <Td colSpan='16' textAlign='center'>
                <LoadingSpinner />
            </Td>
        </Tr>
    }
    if (isError) {
        content = <Td colSpan='16'>{error.data.message}</Td>
    }

    if (isSuccess) {
        content = products.product.map(prod => (
            <Tr key={prod._id}>
                <Td textAlign='center'>
                    {prod.img.length ?
                        <Image src={prod.img[0].url}
                            alt={prod.name} objectFit='cover' />
                        : 'No Image'}
                </Td>
                <Td textAlign='center'>{prod.name}</Td>
                <Td textAlign='center'>{prod.mrp}</Td>
                <Td textAlign='center'>{prod.discount}</Td>
                <Td textAlign='center'>{prod.discounted_price}</Td>
                <Td textAlign='center'>{prod.category}</Td>
                <Td textAlign='center'>{prod.sub_category}</Td>
                <Td textAlign='center' title={`stock ${prod.stock}`}>{prod.stock}</Td>
                <Td textAlign='center'>{prod.isAvailable.toString()}</Td>
                <Td textAlign='center' title={`sold ${prod.sold}`}>{prod.sold}</Td>
                <Td textAlign='center'>{prod.user ? prod.user.name : "user not found"}</Td>
                <Td textAlign='center' color='green.800'>{new Date(prod.createdAt).toLocaleString()}</Td>
                <Td textAlign='center'>
                    <Flex align='center' justify='center'>
                        <React.Suspense fallback={
                            <Flex justify='center' align='center' w='full' h='full'><LoadingSpinner /></Flex>
                        }>
                            <LazyUpdate {...{ product: prod }} />
                        </React.Suspense>
                        <DeleteProduct {...{ name: prod.name ,id:prod._id}} />
                    </Flex>

                </Td>
            </Tr>
        ))
    }

    return <>
        <Box bg='#fff'>
            <Flex py='1' px='2.5'>
                <SearchBox pos='relative' />
                <Badge children='Add Product' variant='solid'
                    title="add Product" textTransform='capitalize'
                    fontWeight='normal' bg='#000' py='2'
                    cursor='pointer' ml='5'
                    onClick={() => navigate(Navigations.addProduct)}
                />
            </Flex>
            <Divider h='2px' mt='1' bg='gray.200' />

            <Box>
                <TableContainer rounded='4px' py='1' w='100%'>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th textAlign='center'>Image</Th>
                                <Th textAlign='center'>name</Th>
                                <Th textAlign='center'>MRP</Th>
                                <Th textAlign='center'>discount</Th>
                                <Th textAlign='center'>discounted_price</Th>
                                <Th textAlign='center'>category</Th>
                                <Th textAlign='center'>sub-category</Th>
                                <Th textAlign='center' isNumeric>stock</Th>
                                <Th textAlign='center'>isAvailable</Th>
                                <Th textAlign='center' isNumeric>total sold</Th>
                                <Th textAlign='center'>createdBy</Th>
                                <Th textAlign='center'>created At</Th>
                                <Th textAlign='center'>action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {content}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    </>
}

export default Products;
