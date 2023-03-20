import { Box, Button, Checkbox, FormControl, FormLabel, Heading, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect, memo } from 'react';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import { useAddReviewMutation } from '../../storeApiSlice';
import LoadingSpinner from '../../../../components/LoadingSpinner'
import UseAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const UpsertReview = ({ prodId, prodName }) => {
    const navigate = useNavigate()
    const { id } = UseAuth()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rating, setRating] = useState(0);
    const [review_title, setReview_title] = useState('')
    const [review, setReview] = useState('')
    const [recommend, setRecommend] = useState(true)
    const [hover, setHover] = useState(0)
    const [errMsg, setErrMsg] = useState('')


    const [addReview, { isLoading }] = useAddReviewMutation()

    useEffect(() => {
        setErrMsg('')

    }, [rating, review_title, review])
    const ratingName = ['poor', 'fair', 'average', 'good', 'excellent']

    const postReview = async () => {
        if (!id) navigate('auth/login')
        else if (!rating > 0) setErrMsg('Rating is required')
        else if (!review_title) setErrMsg('Review Title is required')
        else if (review.length < 1 || review.length > 200) setErrMsg('Review between 15-100 words')
        else {
            try {
                const data = await addReview({ prodId, rating, review_title, review, recommend }).unwrap()
                if (data) {
                    onClose()
                }
            } catch (error) {
                setErrMsg(error.data.message)
            }
        }

    }

    return <React.Fragment>

        <Button fontSize='1.1em'
            p={{ sm: "3", md: '4' }}
            ml={{ base: 0 }}
            pos='relative'

            rounded='1'
            color='#f1f1f1'
            bg='#1c0A00' w='max'
            onClick={onOpen}
        >Write A Review</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px) hue-rotate(20deg)' />
            <ModalContent rounded='3' bg='#fff' mx='1'>
                <ModalBody py={8}>
                    <Heading textTransform='capitalize' fontSize='2em' fontWeight='semibold' children={prodName} />
                    <Box>
                        <FormControl mt='3'>
                            {errMsg ? <Text textAlign='center' color='star' mt='-1' pl='1' textTransform='capitalize'>{errMsg}</Text>
                                : ''}
                            <FormLabel p='0' m='0' fontSize='1em' pl='1'>Rating :</FormLabel>
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    position: "relative",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}
                            >

                                {[...new Array(5)].map((_, index) => {
                                    index += 1
                                    return (
                                        <Box key={index}
                                            position="relative"
                                            sx={{
                                                cursor: "pointer",
                                            }}
                                            color={index <= ((rating && hover) || hover) ? "star" : "star"}
                                            onClick={(e) => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                            onDoubleClick={() => {
                                                setRating(0);
                                                setRating(0);
                                            }}
                                            title={`${ratingName[index - 1]}`}
                                        >
                                            <Box
                                                sx={{
                                                    width: index <= rating || index <= hover ? "100%" : "0%",
                                                    overflow: "hidden",
                                                    position: "absolute",
                                                }}
                                            >

                                                <Icon as={AiTwotoneStar} boxSize={7} color='star' />

                                            </Box>
                                            <Box>
                                                <Icon as={AiOutlineStar} boxSize={7} color='star' />
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>

                            <Text color='star' fontWeight='semibold' mt='-1' pl='1' textTransform='uppercase'>{ratingName[rating - 1]}</Text>

                        </FormControl>
                        <FormControl mt='3'>
                            <FormLabel p='0' m='0' fontSize='1em' pl='1'>Review Title : </FormLabel>
                            <Input type='text'
                                variant='formInput'
                                placeholder='Review Title' mt='2'
                                value={review_title} onChange={(e => setReview_title(e.target.value))}
                            />

                        </FormControl>
                        <FormControl mt='3'>
                            <FormLabel p='0' m='0' fontSize='1em' pl='1'>Review : {review ? review.length : ''} </FormLabel>
                            <Textarea row='4' px='1'
                                variant='formInput'
                                placeholder='Review (15-200 words)' mt='2'
                                fontSize='.8em'
                                value={review} onChange={(e => setReview(e.target.value))}
                            />
                        </FormControl>
                        <FormControl mt='3'>
                            <Checkbox isChecked={recommend}
                                name='active'
                                colorScheme=''
                                iconColor='star'
                                borderColor='star'
                                children={`${recommend ? 'Yes, I would recommend this product.' : 'would you recommend this product?'}`}
                                onChange={() => setRecommend(!recommend)} />
                        </FormControl>
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button variant='blackBtn' bg='star' px='3' mr={3} onClick={postReview}>
                        {isLoading ? <LoadingSpinner color={'#fff'} /> : "Post Review"}
                    </Button>
                    <Button onClick={onClose} variant='blackBtn'>Cancel</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    </React.Fragment>
}

const AddReviewMemo = memo(UpsertReview)
export default AddReviewMemo;
