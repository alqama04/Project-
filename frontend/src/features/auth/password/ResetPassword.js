import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, VStack } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import useToastMsg from '../../../hooks/useToastMsg';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useResetPasswordMutation } from '../authApiSlice';
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const { handleToast } = useToastMsg()
    const { token } = useParams()
    const navigate = useNavigate()
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleSave = async () => {
        if (!password || !confirmPassword) return handleToast({ desc: "all fields are required", status: "error" })
        if (password !== confirmPassword) return handleToast({ desc: "Two password fields did'nt match", status: "error" })
        try {
            const data = await resetPassword({ token, password, confirmPassword }).unwrap()
            handleToast({ desc: data.message, status: "success" })
            navigate('/auth/login')
        } catch (error) {
            handleToast({ desc: error.data.message, status: "error" })
            if (error.status === 403) navigate('/')
        }
    }

    const showPasswordBtn = <IconButton
        position='absolute'
        variant='ghost'
        right='0'
        onClick={() => setShowPass(!showPass)}
        icon={!showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    />

    return (
        <VStack justify='center' px='3' py='4' h='80vh'>
            <Box bg='#fff' rounded='4' shadow='md' w={{ base: "100%", sm: "80%", md: "30em" }} px='3' py='4'>

                <FormControl my='3'>
                    <FormLabel fontWeight='normal' m='0' fontSize='1em' pl='1'>Password</FormLabel>
                    <Flex>
                        <Input type={!showPass ? 'password' : 'text'} variant='formInput' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                        {showPasswordBtn}
                    </Flex>

                </FormControl>

                <FormControl my='3'>
                    <FormLabel fontWeight='normal' m='0' fontSize='1em' pl='1'>confirm Password</FormLabel>
                    <Flex>
                        <Input type={!showPass ? 'password' : 'text'} variant='formInput' placeholder='confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        {showPasswordBtn}
                    </Flex>
                </FormControl>

                <Button my='3' isLoading={isLoading} variant='solid' w='full' onClick={handleSave}>Save</Button>

            </Box>

        </VStack>
    );
}

const ResetPasswordMemo = memo(ResetPassword)
export default ResetPasswordMemo;
