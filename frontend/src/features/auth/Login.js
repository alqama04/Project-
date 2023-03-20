import { Badge, Box, Button, Container, Flex, FormControl, FormLabel, Heading, IconButton, Input, Text, } from '@chakra-ui/react';
import React, { memo, useEffect, useRef, useState, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux';
import { setCredentials, setPersist } from './authSlice';
import Navigations from '../../components/Navigations';
import useToastMsg from '../../hooks/useToastMsg'

const Login = () => {
    const userRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { handleToast } = useToastMsg()

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)


    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        if (isNaN(phone) || phone.length !== 10) return handleToast({ desc: "10 digit Phone Number is required", status: "error" })
        if (password.length < 6) return handleToast({ desc: "Invalid Password length", status: "error" })
        try {
            const { accessToken } = await login({ phone, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            dispatch(setPersist(true))
            handleToast({ desc: "Logged In Successfully", status: "success" })
            setPhone('')
            setPassword('')

            if (location.state?.from) {
                navigate(location.state.from)
            } else if (window.history.state && window.history.statekey !== '') {
                navigate(-1)
            } else {
                navigate('/', { replace: true },)
            }

        } catch (err) {
            if (err.status === 'FETCH_ERROR') {
                handleToast({ desc: "No Server Response", status: "error" })
            }
            else {
                handleToast({ desc: err.data.message, status: "error" })
            }
        }

    }


    return (
        <>
            <Flex m='auto' h='90vh' align='center' px='2'>
                <Container bg='#fff' w={{ base: '100%', md: "30em" }} shadow='md' border='1px' borderColor='gray.100' py='5' rounded='4' >
                    <form>
                        <Heading textAlign='center' fontSize='1.3em' fontWeight='medium' letterSpacing='tight'> Hello </Heading>
                        <Text textAlign='center' letterSpacing='normal'> Sign in to your account </Text>

                        <FormControl my='3'>
                            <FormLabel variant='absoluteLabel'>Phone</FormLabel>
                            <Input ref={userRef} type='number' variant='formInput' value={phone} onChange={e => setPhone(e.target.value)} />
                        </FormControl>

                        <FormControl my='3'>
                            <FormLabel variant='absoluteLabel'>Password</FormLabel>
                            <Flex>
                                <Input type={!showPwd ? 'password' : 'text'}
                                    variant='formInput'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />

                                <IconButton
                                    position='absolute'
                                    variant='ghost'
                                    right='0'

                                    onClick={() => setShowPwd(!showPwd)}
                                    title={!showPwd ? 'see password' : 'hide password'}
                                    icon={!showPwd ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                />
                            </Flex>
                        </FormControl>
                        <Box my='3' pl='2'>
                            <Text pl='1em' fontWeight='medium' fontSize='.7em' as={Link} to={Navigations.forgortPassword} >Forgot Password</Text>
                        </Box>
                        <Button mb='2' type='submit' isLoading={isLoading} variant='solid' w='full' onClick={handleLogin}>login</Button>
                        <Text textAlign='center' mt='3'>Don't have an account ?<Link to={Navigations.signUp}><Badge bg='' textTransform='capitalize' color='red'>SignUp</Badge></Link></Text>
                    </form>

                </Container>
            </Flex>

        </>
    );
}

const loginMemo = memo(Login)
export default loginMemo
