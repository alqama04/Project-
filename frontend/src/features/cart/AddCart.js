import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useAddtoCartMutation } from './CartApiSlice';
import useToastMsg from '../../hooks/useToastMsg'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const AddCart = ({ prodId }) => {

    const [quantity, setQuantity] = useState(1)
    const { handleToast } = useToastMsg()
    const { id } = useAuth()
    const navigate = useNavigate()
    const [addtoCart, { isLoading }] = useAddtoCartMutation()

    const updateQuantity = (e) => {
        if (e.target.name === 'min' && quantity !== 1) {
            setQuantity(quantity - 1)
        }
        if (e.target.name === 'plus' && quantity !== 30) {
            setQuantity(quantity + 1)
        }
    }

    const handleCart = async () => {
        if (!id) navigate('/auth/login')
        else {
            try {
                await addtoCart({ quantity, prodId }).unwrap()
                handleToast({ desc: "Item added to cart successfully", status: "success" })

            } catch (error) {
                handleToast({ desc: error.data.message, status: "error" })
            }
        }
    }

    return (
        <>
            <Box>
                <Flex gap='1' h='.9em' mb='2' align='center'>
                    <Button shadow='lg' variant='solid' fontWeight='medium' h='1.5em' py='0.5em' size='sm' onClick={updateQuantity} name='min'>-</Button>
                    <Input type='number' w='2em' variant='searchInput' h='1.5em' textAlign='center' value={quantity} readOnly />
                    <Button shadow='lg' variant='solid' fontWeight='medium' h='1.5em' py='0.5em' size='sm' onClick={updateQuantity} name='plus'>+</Button>
                </Flex>

                <Box pr='5'>

                    <Button mt='2' isLoading={isLoading} variant='solid' w='full' py='1em' px='2' fontSize='0.8em' onClick={handleCart}>
                        Add to Cart
                    </Button>
                </Box>
            </Box>

        </>
    );
}

export default AddCart;
