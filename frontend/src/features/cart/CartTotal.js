import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const CartTotal = ({ cart, totalAmount,
    totalDiscount,
    shippingCharge,
    amountPayable }) => {

    return (

        <Flex gap='1' w='100%' flexDir='column'>
            <Flex my='1.5' justify='space-between'>
                <Text>Cart Total </Text>
                <Text>₹{totalAmount}.00</Text>
            </Flex>

            <Flex justify='space-between' color='green.400'>
                <Text>Cart Savings</Text>
                <Text>-₹{totalDiscount}.00</Text>
            </Flex>

            <Flex justify='space-between'>
                <Text>Delivery Fee</Text>
                <Box>
                    {cart.length ? shippingCharge === 0 ?
                        <React.Fragment>
                            <Text as='span' color='green.400'>Free</Text>
                            <Text as='span' textDecor='line-through'> ₹99.00</Text>
                        </React.Fragment>
                        :
                        <Text as='span'>{shippingCharge}</Text> : '0.00'
                    }
                </Box>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
                <Text fontWeight='semibold'>Amount Payable</Text>
                <Text fontWeight='semibold'>{amountPayable}.00</Text>
            </Flex>
            <Flex justify='flex-end' py='2' pb='2'>
                <Button variant='solid' w px='4' rightIcon={<BsFillArrowRightSquareFill fontSize='1.2em' />}>checkout</Button>
            </Flex>
        </Flex>
    );
}


export default memo(CartTotal);
