import { Button, Badge, Container, Flex, FormControl, FormLabel, Heading, IconButton, Input, Text, } from '@chakra-ui/react';
import React, { memo, useMemo, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Navigations from '../../../components/Navigations'

const SignUpForm = ({ signUpObj }) => {
    const [validUsername, setValidUsername] = useState(false)
    const [validPhone, setValidPhone] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [show, setShow] = useState(false)

    const invalidUsername = useMemo(() => {
        if (signUpObj.username) {
            const USERNAME_REGEX = /^[A-z ]{4,20}$/
            setValidUsername(USERNAME_REGEX.test(signUpObj.username))
            if (!USERNAME_REGEX.test(signUpObj.username)) {
                return <Text color='red.500' fontSize='.7em' fontWeight='semibold' pl='1'>Only Alphabet [4-20].</Text>
            }
        }
        return
    }, [signUpObj.username])

    const invalidPhone = useMemo(() => {
        if (signUpObj.phone) {
            const PHONE_REGEX = /^[0-9]{10}$/
            setValidPhone(PHONE_REGEX.test(signUpObj.phone))
            if (!PHONE_REGEX.test(signUpObj.phone)) {
                return <Text color='red.500' fontSize='.7em' fontWeight='semibold' pl='1'>10 digit mobile number.</Text>
            }
        }
        return
    }, [signUpObj.phone])

    const invalidPassword = useMemo(() => {
        if (signUpObj.password) {
            const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
            setValidPassword(PASSWORD_REGEX.test(signUpObj.password))
            if (!PASSWORD_REGEX.test(signUpObj.password)) {
                return <Text color='red.500' fontSize='.7em' fontWeight='semibold' pl='1'>password length should [6-30]with the combination of Alpha Numeric and symbols.</Text>
            }
        }
        return
    }, [signUpObj.password])

    let passwordNotMatch;
    if (signUpObj.password !== signUpObj.password2 && signUpObj.password2) {
        passwordNotMatch = <Text color='red.600' fontSize='.7em' fontWeight='semibold' pl='1'>Two password fields does not match</Text>
    }
    const canSignUp = [validUsername, validPhone, validPassword, signUpObj.password === signUpObj.password2].every(Boolean)
    const showPasswordBtn = <IconButton
        position='absolute'
        variant='ghost'
        right='0'
        onClick={() => setShow(!show)}
        icon={!show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    />


    return (
        <React.Fragment>
            <Flex m='auto' h='90vh' align='center' px='2'>
                <Container bg='#fff' w={{ base: '100%', md: "30em" }} shadow='md' border='1px' borderColor='gray.100' py='5' rounded='4' >
                    <Heading textAlign='center' fontSize='1.3em' fontWeight='medium' letterSpacing='tight'> Hello </Heading>
                    <Text textAlign='center' letterSpacing='normal'> Create your account </Text>
                    <form>
                        <FormControl mt='4'>
                            <FormLabel variant='absoluteLabel'>Username</FormLabel>
                            <Input type='text' variant='formInput' value={signUpObj.username} onChange={e => signUpObj.setUsername(e.target.value)} />
                            {invalidUsername}
                        </FormControl>

                        <FormControl my='3'>
                            <FormLabel variant='absoluteLabel'>Phone</FormLabel>
                            <Input type='text' variant='formInput'  value={signUpObj.phone} onChange={e => signUpObj.setPhone(e.target.value)} />
                            {invalidPhone}
                        </FormControl>

                        <FormControl my='3'>
                            <FormLabel variant='absoluteLabel'>Password</FormLabel>
                            <Flex>
                                <Input type={!show ? 'password' : 'text'} variant='formInput' id='password' value={signUpObj.password}  onChange={e => signUpObj.setPassword(e.target.value)} />
                                {showPasswordBtn}
                            </Flex>
                            {invalidPassword}
                        </FormControl>

                        <FormControl my='4'>
                            <FormLabel variant='absoluteLabel'>Confirm Password</FormLabel>
                            <Flex>
                                <Input type={!show ? 'password' : 'text'} variant='formInput' value={signUpObj.password2}  onChange={e => signUpObj.setPassword2(e.target.value)} />
                                {showPasswordBtn}

                            </Flex>
                            {passwordNotMatch}
                        </FormControl>

                        {canSignUp ?
                            <Button mb='2' type='submit' isLoading={signUpObj.isLoading} variant='solid' w='full' onClick={signUpObj.handleSignUp}>SignUp</Button>
                            :
                            <Button my='2' variant='solid' w='full'>SignUp</Button>
                        }

                        <Text textAlign='center' mt='3'>already have an account ?<Link to={Navigations.login}><Badge bg='' textTransform='capitalize' color='red'>Login</Badge></Link></Text>
                    </form>

                </Container>
            </Flex>

        </React.Fragment>
    );
}

const signUpFormMemo = memo(SignUpForm)
export default signUpFormMemo;

