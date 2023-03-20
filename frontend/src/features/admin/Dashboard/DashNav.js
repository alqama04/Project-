import { Box, Button, Divider, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react';
import { MdDashboard } from 'react-icons/md'
import { DashObj } from './DashObj'
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import Logout from '../../auth/Logout';
import useAuth from '../../../hooks/useAuth'
import './Dasboard.css'
import { useRef, useState } from 'react';
const DashNav = () => {
    const { role, name } = useAuth()
    const [show, setShow] = useState(false)
    const { handeLogout, isLoading } = Logout()

    const dashNav = useRef(null)

    const closeOpenMenus = (e) => {
        if (dashNav.current && show && !dashNav.current.contains(e.target)) {
            setShow(false)
        }
        if (dashNav.current && show && dashNav.current.contains(e.target)) {
            setShow(false)
        }
    }
    document.addEventListener('mousedown', closeOpenMenus)


    const dashObj = DashObj.map(dash => (
        <Flex

            key={dash.id}
            align='center'
            px='3'
            w='100%'
            rounded='4'
            py='1.5'
            gap='2'
            _hover={{ bg: 'black', color: '#f1f1f1' }}
            mt='3'
            as={NavLink}
            to={`${dash.link}`}
            end
            _activeLink={{ bg: "black", color: "#f1f1f1" }}
        >
            <Icon as={dash.icon} boxSize={5} />
            <Text children={dash.name} />
        </Flex>
    ))
    return (
        <Box h='auto' pos={{ base: 'absolute', lg: "relative" }} zIndex={1} ref={dashNav}>
            {!show ?
                <IconButton className='toggleBtn' onClick={() => setShow(!show)} size='' icon={<BsChevronCompactRight />} /> : ''
            }
            <Flex
                justify='space-between' flexDir='column'
                h='max-content'
                bg='#fff' px='' shadow='lg'
                w='13em'
                className={`dashNav ${show ? ' show' : ''}`}
            >
                <Box>
                    <Flex align='center' justify='space-between'>
                        <Button textAlign='center' variant='ghost' color='black' leftIcon={<MdDashboard />} px='2'>Dashboard </Button>
                        {show ?
                            <IconButton className='toggleBtn1' onClick={() => setShow(!show)} size='' icon={<BsChevronCompactLeft />} />
                            : ""
                        }
                    </Flex>
                </Box>
                <Divider bg='gray.200' height='.1em' />

                {dashObj}
                <Box>
                    <Divider bg='gray.200' height='.1em' />
                    <Flex align='center' justify='space-between' p='2'>
                        <Box textTransform={'capitalize'}>
                            <Heading children={`Hello, ${name}`} fontSize='.9em' />
                            <Text children={role} fontSize='.6em' fontWeight='semibold' />
                        </Box>
                        <IconButton
                            isLoading={isLoading}
                            onClick={handeLogout} variant='iconBtn'
                            title="Logout" color='gray.700'
                            size='sm' icon={<RiLogoutCircleRLine />} />
                    </Flex>
                </Box>

            </Flex>
        </Box>
    );
}

export default DashNav;






































// import { Box, Button, Divider, Flex, Heading, Icon, Slide, Text, } from "@chakra-ui/react"
// import React, { useState } from "react"
// import { MdDashboard } from 'react-icons/md'
// import { NavLink } from "react-router-dom"
// import { AiOutlineClose } from 'react-icons/ai'
// import { DashObj } from "./DashObj"

// function DashNav() {
//     const [isOpen, onToggle] = useState(false)

//     const active = {
//         w: '100%',
//         bg: 'black',
//         color: "#f1f1f1",
//     }
//     const dashObj = DashObj.map(dash => {
//         return (<Flex
//             key={dash.id}
//             align='center'
//             px='3'
//             w='100%'
//             rounded='4'
//             py='1.5'
//             gap='2'
//             _hover={{ bg: 'black', color: '#f1f1f1' }}
//             mt='3'
//             as={NavLink}
//             to={`${dash.link}`}
//             exact
//             _activeLink={active}

//         >
//             <Icon as={dash.icon} boxSize={5} />
//             <Text>{dash.name}</Text>
//         </Flex>
//         )

//     })
//     return (
//         <>
//             <Box w='12em' overflow='hidden'>
// <Icon as={AiOutlineClose} bg='black' color='#f1f1f1' rounded='lg' display={{ lg: 'none' }} />

//                 <Slide direction='left' in={true} style={{ zIndex: 10 }} animate='0'>
//                     <Flex flexDir='column' justify='space-between' bg='#fff' h='100%' px='4' w='12em' borderRight='2px' borderColor='gray.100' zIndex={'1'} shadow="md">
//                         <Box>
//                             <Flex align='center' justify='space-between'>
//                                 <Button textAlign='center' color='black' leftIcon={<MdDashboard />} px='2'>Dashboard </Button>
//                                 <Icon as={AiOutlineClose} bg='black' color='#f1f1f1' rounded='lg' display={{ lg: 'none' }} />
//                             </Flex>
//                             <Box>
//                                 {dashObj}
//                             </Box>
//                         </Box>

//                     </Flex>
//                 </Slide>
//             </Box>

//         </>
//     )
// }

// export default DashNav


