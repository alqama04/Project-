import { Box, Container, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import imageNotFound from '../../images/imageNotFound.png'

import { useGetCartQuery } from './CartApiSlice';
import CartTotal from './CartTotal';
import DeleteCart from './DeleteCart';
import UpdateCart from './UpdateCart';

const CartItems = () => {
    const { data, isLoading, isSuccess } = useGetCartQuery()
    let cartItems
    let orderDetail

    if (isLoading) {
        cartItems = <LoadingSpinner size={20} />
    }

    if (isSuccess) {
        const { cart } = data

        cartItems = cart.length ? cart.map(item => {
            let totalMrp = item.product.mrp * item.quantity
            let discounted_Price = item.product.discounted_price * item.quantity
            return (<React.Fragment key={item._id}><Flex gap='3'>
                <Box>
                    {item.product.img.length ?
                        <Image objectFit='contain'
                            boxSize={{ base: '115px', md: "130px" }}
                            src={item.product.img[0].url}
                            alt={item.product.name}
                            p='2'
                            bg='blackAlpha.50'
                            rounded='2'
                        />
                        : <Image objectFit='contain'
                            boxSize={{ base: '115px', md: "130px" }}
                            src={imageNotFound}
                            alt={item.product.name}
                            bg='blackAlpha.50'
                            p='2'
                            rounded='2'
                        />}
                </Box>

                <Box w='full'>
                    <Text fontWeight='medium' textTransform='capitalize'>{item.product.name}</Text>
                    <Text fontWeight='medium'>MRP. ₹{totalMrp}</Text>
                    <Text fontWeight='medium'>₹{discounted_Price} ({item.product.discount}%)</Text>

                    <Text fontWeight='medium' color='green.400'>You Save {totalMrp - discounted_Price}</Text>
                    <Flex align='center' mt='0.5' gap='1'>
                        <UpdateCart {...{ id: item._id, value: item.quantity }} />
                        <DeleteCart id={item._id} />
                    </Flex>
                </Box>
            </Flex>
                <Divider />
            </React.Fragment>
            )
        }) : <Text fontWeight='semibold' textAlign='center'>Empty Cart</Text>

        orderDetail = <CartTotal {...{ ...data }} />
    }


    return (
        <Container h='100vh' maxW={{ base: "100%", sm: "95%", lg: "80%" }} px='1' mx='auto' >
            <Flex justify='space-between' my='5' flexDir={{ base: 'column', lg: "row" }} gap='2'>
                <Box w={{ base: '100%', md: "100%", lg: "70%" }} bg='#fff' shadow='md' rounded='3' px='2' mt={{ base: '5', sm: "0" }}>
                    <Box>
                        <Heading fontSize={'1.3em'} my='4'>Shopping Cart</Heading>
                        <Divider />

                        <Flex gap='2' py='1' flexDir='column'>
                            {cartItems}
                        </Flex>
                    </Box>
                </Box>
                <Box flex='1' bg='#fff' shadow='md' rounded='3' px='2' h='max-content' >
                    <Heading fontSize={'1.3em'} my='4'>Order Details</Heading>
                    <Divider />
                    {orderDetail}
                </Box>
            </Flex>
        </Container>
    );
}

export default CartItems;
