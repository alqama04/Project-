import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import UseAuth from '../../../hooks/useAuth';
import useToastMsg from '../../../hooks/useToastMsg';
import { useChangePasswordMutation } from '../authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { Link, NavLink } from 'react-router-dom';
import Navigations from '../../../components/Navigations';

const ChangePassword = () => {
    const { id, name } = UseAuth()
    const { handleToast } = useToastMsg()
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')
    const [validPass, setValidPass] = useState(false)

    const [showPass, setShowPass] = useState(false)

    const [changePassword, { isLoading }] = useChangePasswordMutation()


    const invalidPassword = useMemo(() => {
        if (newPassword) {
            const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
            if (!PASSWORD_REGEX.test(newPassword)) {
                setValidPass(false)
                return <Text color='red.500' fontSize='.7em' fontWeight='semibold' pl='1'>password length should [6-30]with the combination of Alpha Numeric and symbols.</Text>
            } else {
                return setValidPass(true)
            }
        }

    }, [newPassword])

    const showPasswordBtn = <IconButton
        position='absolute'
        variant='ghost'
        right='0'
        onClick={() => setShowPass(!showPass)}
        icon={!showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    />

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmNewPassword) return handleToast({ desc: "all fields are required", status: "error" })
        if (newPassword !== confirmNewPassword) return handleToast({ desc: "new password & confirm new password didn't match", status: "error" })
        if (oldPassword === newPassword) return handleToast({ desc: "New password can't be same as old password", status: "error" })
        if (!validPass) return handleToast({ desc: "password requirement didn't match" })
        
        try {
            const { accessToken } = await changePassword({ id, oldPassword, newPassword, confirmNewPassword }).unwrap()

            if (accessToken) {
                handleToast({ desc: "password changed successfully", status: "success" })
                dispatch(setCredentials({ accessToken }))
            }
        } catch (error) {
            handleToast({ desc: error.data.message, status: "error" })
        }
    }


    return (
        <Flex justify='center' align='center' h='80vh' p='2'>

            <Box bg='#fff' w={{ base: "100%", md: "30em" }} px='3' py='5' mx='auto' rounded='4' shadow='md'>
                <Box my='3' textAlign='center'>
                    <Avatar name={name} />
                    <Text textTransform='capitalize'>{name}</Text>
                </Box>
                <Divider />
                <FormControl my='3'>
                    <FormLabel variant='absoluteLabel'>Old Password</FormLabel>
                    <Input type='password' variant='formInput' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </FormControl>
                <FormControl my='3'>
                    <FormLabel variant='absoluteLabel'>New Password</FormLabel>
                    <Flex >
                        <Input type={!showPass ? 'password' : 'text'} variant='formInput' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        {showPasswordBtn}
                    </Flex>
                    {invalidPassword}
                </FormControl>
                <FormControl my='3'>
                    <FormLabel variant='absoluteLabel'>Confirm New Password</FormLabel>
                    <Flex>
                        <Input type={!showPass ? 'password' : 'text'} variant='formInput' value={confirmNewPassword} onChange={e => setconfirmNewPassword(e.target.value)} />
                        {showPasswordBtn}
                    </Flex>
                </FormControl>
                <Text pl='1em' fontWeight='medium' fontSize='.7em' as={Link} to={Navigations.forgortPassword} >Forgot Password</Text>
                <Box mt='1em'>
                    <Button isLoading={isLoading}
                        cursor={isLoading ? 'not-allowed' : "pointer"}
                        variant='solid' w='full'
                        onClick={handleChangePassword}

                    >Update Password</Button>
                </Box>
            </Box>
        </Flex>
    );
}

export default ChangePassword;
