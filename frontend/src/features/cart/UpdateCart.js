import React, { useState, } from 'react';
import { Button, Flex, IconButton, Input } from '@chakra-ui/react';
import { useUpdateCartMutation } from './CartApiSlice';
import { BiCheck } from 'react-icons/bi'
const UpdateCart = ({ id, value }) => {
    const [quantity, setQuantity] = useState(value)
    const [show, setShow] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const [updateCart, { isLoading }] = useUpdateCartMutation()

    const handleQuantity = (e) => {
        if (e.target.name === 'min' && quantity !== 1) {
            setQuantity(quantity - 1)
            setShow(true)
        }
        if (e.target.name === 'plus' && quantity !== 40) {
            setQuantity(quantity + 1)
            setShow(true)
        }
    }

    const update = async () => {
        try {
            const data = await updateCart({ id, quantity }).unwrap()
            if (data) {
                setShow(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>

            <Flex h='1.2em' gap='1' align='center' overflow='hidden'>
                <Button
                    shadow='lg'
                    fontWeight='medium'
                    py='0.6em'
                    size='sm'
                    name='min'
                    onClick={(e) => handleQuantity(e)} >-</Button>
                <Input type='number' w='2em' variant='formInput' value={quantity} py='.4px' textAlign='center' readOnly />
                <Button
                    shadow='lg'
                    fontWeight='medium'
                    py='0.6em'
                    size='sm'
                    name='plus'
                    onClick={(e) => handleQuantity(e)} >+</Button>
                <IconButton
                    variant=''
                    px='2'
                    fontWeight='semibold'
                    fontSize='1.2em'
                    size=''
                    shadow='lg'
                    bg='orange'
                    borderRadius='full'
                    display={show ? "block" : 'none'}
                    onClick={update}
                    icon={<BiCheck />}
                />

            </Flex>
        </React.Fragment>
    );
}

export default UpdateCart;
