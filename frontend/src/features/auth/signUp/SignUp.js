import { memo, useState } from 'react';
import { useAddNewUserMutation } from '../../users/userApiSlice';
import SignUpForm from './SignUpForm';
import useToastMsg from '../../../hooks/useToastMsg'
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { handleToast } = useToastMsg()

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')


    const [addNewUser, { isLoading }] = useAddNewUserMutation()
    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const data = await addNewUser({ name: username, phone, password }).unwrap()
            handleToast({ desc: data.message, status: "success" })


            // if (location.state?.from) {
            //     navigate(location.state.from)
            // } else navigate('/')

            
        } catch (err) {
            if (err.status === 'FETCH_ERROR') {
                handleToast({ desc: 'No Server Response', status: "error" })
            }
            handleToast({ desc: err.data.message, status: "error" })

        }
    }
    const obj = {
        username,
        setUsername,
        phone,
        setPhone,
        password,
        setPassword,
        password2,
        setPassword2,
        handleSignUp,
        isLoading
    }
    return (
        <>
            <SignUpForm signUpObj={obj} />
        </>
    );
}

const signUpMemo = memo(SignUp)
export default signUpMemo;
