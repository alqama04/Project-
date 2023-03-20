import React from 'react';
import { Badge, Box, Flex, IconButton } from '@chakra-ui/react'
import { BiCartAlt } from "react-icons/bi";
import SearchBox from './SearchBox';
import Logo from '../Logo';
import { NavLink } from 'react-router-dom';

const LazyUserLinks = React.lazy(() => import('./UserLinks'))
const LazyCategory = React.lazy(() => import('./Category'))
const LazyMobileDrawer = React.lazy(() => import('./MobileDrawer'))

const Navbar = () => {
    const cartIcon =
        <Flex align='center' as={NavLink} to='/cart'>
            <IconButton
                size={{ base: 'sm' }}
                variant="iconBtn"
                mt='1'
                icon={<BiCartAlt />
                } />
            <Badge
                bg='red.600'
                color='#f2f2f2'
                borderRadius='50'
                p='-1'
                ml='-1.5' mt='-2'
                fontSize='.6em'
            >
                10
            </Badge>

        </Flex>
    return (
        <>
            <Box pos="fixed" w='100%' zIndex='1000' borderBottom='2px' borderColor='gray.200'>
                <Flex justify={{ base: 'space-between', sm: "space-around" }}
                    align='center'
                    gap='4'
                    bg='#fff'
                    p='2'
                    px={{ base: '2', md: '10', xl: "40" }}
                    h={{ base: "3em", sm: "3.4em" }}

                >
                    {/* drower menu for mobile*/}

                    <React.Suspense fallback={''}>
                        <LazyMobileDrawer />
                    </React.Suspense>


                    <Box display={{ sm: 'none' }}></Box>

                    {<Logo w={'6em'} h={'3.7em'} />}

                    <React.Suspense fallback={''}>
                        <LazyCategory />
                    </React.Suspense>

                    <SearchBox />

                    <Flex gap='1'>
                        <React.Suspense fallback={''}>
                            <LazyUserLinks />
                        </React.Suspense>

                        {cartIcon}
                    </Flex>
                </Flex>
            </Box>
            <Box pb='14'> </Box>
        </>
    );
}

export default Navbar;





