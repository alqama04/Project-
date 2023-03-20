import React, { memo } from 'react';
import { Box, Button, Collapse, Container, Divider, Flex, Heading, ListItem, SimpleGrid, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ImageGallery } from '../../../components/Swiper';
import CardImgGallery from '../../../components/swiper/CardImageGallery'

import { useProductDetailQuery } from '../storeApiSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import GetReview from './review/GetReview';
import StarRating from '../../../components/StarRating';
import UseAuth from '../../../hooks/useAuth';
import Navigations from '../../../components/Navigations';

const LazyAddCart = React.lazy(() => import('../../cart/AddCart'))
const LazyUpsertReview = React.lazy(() => import('./review/UpsertReview'))

const ProductDetail = () => {
    const { isOpen, onToggle } = useDisclosure()
    const { id: userId } = UseAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useProductDetailQuery({ id, userId })

    if (isLoading) {
        return <Flex w='full' h='100vh' justify='center' align='center'>
            <LoadingSpinner color={'black'} size={40} />
        </Flex>
    }

    if (isError) {
        return <Flex w='full' h='100vh' justify='center' align='center'>
            <Heading color='blackAlpha.800' textTransform='capitalize'>{error.data.message}</Heading>
        </Flex>
    }
    const { product, reviews, productInCart } = data

    const getWeight = Number(product.net_weight.split('gm')[0])
    const hundredGramPrice = isNaN(getWeight) ? "NA" : product.net_weight ? Number(Math.round(product.discounted_price / getWeight * 100), 0) : ""
    const productWeight = isNaN(getWeight) ? "NA" : getWeight >= 1000 ? `${Number(getWeight / 1000)}kg` : `${getWeight}gm`


    const addToCart = !productInCart ? <React.Suspense fallback={'loading...'}><LazyAddCart {...{ prodId: product._id }} /></React.Suspense>
        :
        <Button variant='solid'
            py='1em' px='2'
            mt='.5em' w='max-content'
            onClick={() => navigate(Navigations.cart)}
        > go To cart</Button>

    const addReview = <React.Suspense fallback={'loading...'}><LazyUpsertReview {...{ reviews, prodId: product._id, name: product.name }} /></React.Suspense>
    const getReview = <GetReview {...{ reviews, prodId: product._id, totalRating: product.avgRating }} />

    return (
        <Container maxW='100%' p='2' mt={{ base: '7', sm: '0', lg: '2' }}>
            <Box bg='#fff' sx={{ border: "1px solid #eeee" }} rounded='2' py='5'>

                <SimpleGrid columns={{ base: '1', md: '2' }} columnGap='5' pb='2'>
                    <Box display={{ base: 'block', md: "none" }}>
                        <CardImgGallery image={product.img} />
                    </Box>
                    <Box display={{ base: 'none', md: "block" }} px='2' >
                        <ImageGallery image={product.img} />
                    </Box>

                    <Flex mt='3' flexDir='column' gap='1' lineHeight='25px' px='2'>
                        <Heading textTransform='capitalize' fontSize='1.2em' fontWeight='semibold'>{product.name}</Heading>

                        <Flex mt='1.5' >
                            <StarRating rating={product.avgRating} />
                            <Text textTransform='capitalize' fontSize='.9em' mt='-0.5' fontWeight='medium'>(Total reviews : {reviews.length})</Text>
                        </Flex>

                        <Box>
                            <Text as='span' textDecor='line-through' fontSize='.9em'>M.R.P.:₹{product.mrp}</Text>
                            <Text as='span' textTransform='capitalize' fontSize='1em' fontWeight='' px='2'>Price:₹{product.discounted_price}</Text>
                            <Text textDecor='' fontSize='.9em' >Yous Save ₹{product.mrp - product.discounted_price} ({product.discount}% off)</Text>
                            <Text textDecor='' fontSize='.8em'>{productWeight} (100gm/₹{hundredGramPrice}) </Text>
                            <Text textDecor='' fontSize='.7em' fontWeight='semibold'>Inclusive of all taxes</Text>
                        </Box>

                        {addToCart}

                        <Text mt='2'> {product.description} </Text>
                        <Text><Text as='span' fontWeight='semibold'>ingredients:-</Text>{product.ingredients} </Text>
                        <UnorderedList m='0' mt='2'>
                            <Heading fontSize='1em' fontWeight='semibold'>About this item</Heading>
                            <Box pl='3.5'>
                                {product.bulletPoints.map((point, i) => (
                                    <ListItem key={i}>{point}</ListItem>
                                ))
                                }

                            </Box>
                        </UnorderedList>

                        <Divider h='.7px' bg='gray.300' />

                        <Button fontSize='1em' w='max-content'
                            fontWeight='semibold'
                            variant='basicBtn'
                            p='0'
                            onClick={onToggle} rightIcon={isOpen ? <AiOutlineMinus fontSize='1.2em' /> : <AiOutlinePlus fontSize='1.2em' />}>
                            How to use
                        </Button>
                        <Collapse in={isOpen} animateOpacity>
                            <Box pb='2'>
                                {product.utilize}
                            </Box>
                        </Collapse>
                    </Flex>
                </SimpleGrid>
            </Box>
            <Box mt='1'>
                <Box ml={{ base: '1em', md: "6em", lg: "8.5em" }}>
                    {addReview}
                </Box>
                {getReview}
            </Box>
        </Container>
    );
}

const prdouctDetailMemo = memo(ProductDetail)
export default prdouctDetailMemo;
