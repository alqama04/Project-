import { Box, Button, Divider, Flex, Heading, Icon } from "@chakra-ui/react";
import { GiTimeTrap } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import Navigation from "../components/Navigations";
import './SessionExp.css'

const SessionExp = () => {
    const [time, setTime] = useState(5)
  
    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1)
        }, 1000)
        if (time <= 0) {
            localStorage.removeItem('persist') 
            window.location.reload(true)
        }
    }, [time])


    const goToLogin = () => {
        localStorage.removeItem('persist') 
        window.location.reload(true)
        return <Navigate to={Navigation.login} />
    }
  
    return (
        <Flex justify='center' align='center' w='100vw' h='100vh' bg='white'>
            <Box bg='black' shadow='lg' w='30em' rounded='lg' border='2px' py='5' borderColor='wheat' textAlign='center'>
                <Icon as={GiTimeTrap} boxSize='14' color={'white'} className='timeTrap' />

                <Heading fontSize='1.4em' mt='3' color='#f1f1f1' fontWeight='normal'>Whoops, Your Session has Expired </Heading>
                <Heading fontSize='1em' mt='2' color='#f1f1f1' fontWeight='normal'>Please Login again</Heading>
                <Button color='#f2f2f2' fontSize='0.7em'>redirecting...{time}</Button>
                <Divider />
                <Button color='#f2f2f2' bg='#' variant='link' mx='3' mt='3' onClick={goToLogin}>Login </Button>
            </Box>
        </Flex>
    );
}

export default SessionExp;
