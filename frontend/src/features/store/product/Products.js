import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../../components/StarRating';
import imageNotFound from '../../../images/imageNotFound.png'
import React, { memo } from 'react';


const Products = ({ products }) => {
    const navigate = useNavigate()
    let content
    content = products.product.map(product => {
        return <Box key={product._id} cursor='pointer'>
            <Box
                onClick={() => navigate(`${product._id}`)}
                bg='#fff'
                shadow='md'
                p='2'
                textTransform='capitalize'
            >
                <Text bg='red.600' mt='-1.5' ml='-1' color='#fff' rounded='full' px='1.5' pos='absolute' fontSize='0.7em'>{product.discount}%off</Text>
                {product.img.length ?
                    <Image
                        mx='auto'
                        src={product.img[0].url}
                        alt={product.name}
                        objectFit='contain'
                        p='1em'
                    />
                    :
                    <Image
                        mx='auto'
                        src={imageNotFound}
                        alt={product.name}
                        objectFit='contain'
                        p='1em'
                    />
                }
                <Text fontWeight='medium'>{product.name}</Text>
                <StarRating {...{ rating: product.avgRating, size: 3, color: "#FFCB42" }} />
                <Flex align='center' flexWrap='wrap'>
                    <Text fontWeight='semibold' color='red.600'>₹{product.discounted_price}</Text>
                    <Text textDecor='line-through' fontSize='.7em' px='3px'>₹{product.mrp}</Text>
                </Flex>
            </Box>
        </Box>
    })

    return <React.Fragment>
        <SimpleGrid
            columns={{ base: '2', sm: "2", md: '4', lg: '5' }}
            mt='4'
            columnGap='2'
            rowGap='3'>
            {content}
        </SimpleGrid>
    </React.Fragment>

}
const ProductMemo = memo(Products)

export default ProductMemo;
