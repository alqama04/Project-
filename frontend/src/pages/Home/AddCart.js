import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import useToastMsg from '../../hooks/useToastMsg'
const AddCart = () => {

    const { handleToast } = useToastMsg()
    const handleCart = () => {
        handleToast({ desc: "item added to cart", status: "success" })
    }
    return (
        <React.Fragment>
            <IconButton mt='-2'
                rounded='full'
                shadow='md'
                fontWeight='bold'
                variant=''
                size='sm'
                fontSize='1em'
                color='red.600'
                title='add to cart'
                onClick={handleCart}
                icon={<AiOutlinePlus />} />

        </React.Fragment>
    );
}

export default AddCart;
