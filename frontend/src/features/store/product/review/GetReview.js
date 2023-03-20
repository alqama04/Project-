import { Avatar, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { MousewheelSlide } from '../../../../components/Swiper';
import UseAuth from '../../../../hooks/useAuth';
import StarRating from '../../../../components/StarRating';
import DeleteReview from './DeleteReview';

const GetReview = ({ reviews, totalRating }) => {
    const { id } = UseAuth()
    let content
    let newReview
    let currentUserRev
    if (id) {
        currentUserRev = reviews.find(rev => rev.user._id === id)
        const rev = reviews.filter(rev => rev.user._id !== id)
        currentUserRev ? newReview = [currentUserRev, ...rev] : newReview = rev
    } else newReview = reviews

    let fiveStatr = 0
    let fourStar = 0
    let threeStar = 0
    let twoStar = 0
    let oneStar = 0
    let revContent = newReview?.length ? newReview.map((rev) => {
        if (rev.rating === 5) { fiveStatr += 1 }
        if (rev.rating === 4) { fourStar += 1 }
        if (rev.rating === 3) { threeStar += 1 }
        if (rev.rating === 2) { twoStar += 1 }
        if (rev.rating === 1) { oneStar += 1 }

        return (
            <Box key={rev._id} w='100%'>
                <Flex gap='2' flexDir='column'>
                    <Flex justify='space-between'>
                        <Flex gap='1'>
                            <Avatar
                                size='xs'
                                name={rev.user.name}
                            />
                            <Text ml='1' textTransform='capitalize' fontWeight='semibold'  >{rev.user.name}</Text>
                        </Flex>
                        <Flex gap='2'>
                            <Text textAlign='right' >{new Date(rev.createdAt).toLocaleDateString()}</Text>
                            {id === rev.user._id ?

                                <DeleteReview {...{
                                    revId: rev._id,
                                    userId: rev.user._id,
                                    prodId: rev.product._id,

                                }} />
                                : ''
                            }
                        </Flex>
                    </Flex>
                    <Box>
                        <Flex align='flex-start' mt={{ base: '3.5', sm: '4.5', md: '6' }} ><StarRating rating={rev.rating} /></Flex>
                        <Heading fontWeight='semibold' my={{ base: '3.5', sm: '4.5', md: '6' }}>{rev.review_title}</Heading>
                        <Text fontSize='1em' fontWeight='semibold'>{rev.review}.</Text>
                        <Text fontSize='1em' fontWeight='semibold' mt='4'>{rev.recommend ? "Yes,I would recommend this product." : ""}.</Text>
                    </Box>
                </Flex>
            </Box>
        )
    }) : []

    content = <MousewheelSlide {...{ data: revContent, h: ['23em', '17.6em', '17.7em', '17.2em'] }} />


    const ratingCount = [oneStar, twoStar, threeStar, fourStar, fiveStatr]

    return (
        <React.Fragment>
            <SimpleGrid columns={{ base: '1', md: '2' }} bg='red.200' shadow='lg' alignContent='center' px={{ base: '1em', md: "6em", lg: '8.5em' }} rounded='2' h='15em'>

                <Box>
                    <Heading fontSize='1.6em' fontWeight='bold'>Over All </Heading>
                    <Flex align='center' gap={'2.5'} mt='3'>
                        <StarRating {...{ rating: totalRating, size: 7 }} />
                    </Flex>
                </Box>
                <Flex justify='center' align='center' mt='3' flexDir='column'>
                    {Array.from({ length: 5 }, (_, index) => {
                        index += 1
                        return (<Flex align='center' gap='3' key={index}>
                            <Flex color='star' fontSize='1.2em'>
                                <StarRating {...{ rating: index }} />
                            </Flex>
                            <Box w={{ base: '180px', sm: "230px", md: "300px" }} h='4px' bg='star'></Box>
                            <Text>{ratingCount[index - 1]}</Text>
                        </Flex>
                        )
                    }).reverse()}

                </Flex>

            </SimpleGrid>

            <Box mt='5' sx={{ shadow: "lg", }} w={{ base: '100%', md: "80%", lg: "60%" }} mx='auto' bg='#fff'>
                <Box px='2' py={{ base: '6', md: "8" }}>
                    {revContent.length ? content : "NO Reviews"}
                </Box>
            </Box>
        </React.Fragment>
    )
}


export default memo(GetReview);
