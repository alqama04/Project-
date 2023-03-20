import { Box, Button, Divider, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { memo } from "react";
import { BiUserPin } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import Logout from '../../features/auth/Logout';
import useAuth from '../../hooks/useAuth'
import Navigations from "../Navigations";
import { UserLinksObj } from "./UserLinksObj";

const UserLinks = () => {
    const { role, name } = useAuth()
    const { handeLogout, isLoading } = Logout()
    let content
    const userNavLinks = UserLinksObj.map(profile => (
        <Box mt='1.5' px='2' py='1'
            _hover={{ bg: "black", color: "#f1f1f1" }} rounded='4'
            transition='.6s' key={profile.id}
            as={NavLink}
            to={`${profile.link}`}
            end
            _activeLink={{ bg: "black", color: "#f1f1f1" }}
        >
            {profile.name}
        </Box>
    ))

    if (name === '') {
        content = <Flex align='center'>
            <Link to={Navigations.login}>
                <Button variant='solid' size='sm'>Login</Button>
            </Link>
        </Flex>
    } else {
        content = <>
            <Popover isLazy>
                <PopoverTrigger >
                    <Button size='sm' variant='iconBtn' pt='2' mt='.5' leftIcon={<BiUserPin />} />
                </PopoverTrigger>
                <PopoverContent w='12em' dropShadow='lg' bg='white'>
                    <PopoverArrow />
                    <PopoverBody px='0'>
                        <Flex flexDir='column'>
                            {userNavLinks}


                            <Divider bg='gray.300' h='1px' />

                            {role !== 'user' ?
                                <Box mt='1.5' px='2' py='1'
                                    _hover={{ bg: "black", color: "#f1f1f1" }} rounded='4'
                                    transition='.6s'
                                    as={NavLink}
                                    to={Navigations.dashboard}
                                >
                                    Dashboard
                                </Box> : ''
                            }
                            <Divider bg='gray.300' h='1px' />

                            <Button mt='1.5' px='2' py='1'
                                _hover={{ bg: "black", color: "#f1f1f1" }} rounded='4'
                                transition='.6s'
                                variant='basicBtn'
                                isLoading={isLoading}
                                cursor='pointer'
                                onClick={handeLogout}
                            >
                                Logout
                            </Button>

                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    }

    return content
}

const UserLinksMemo = memo(UserLinks)
export default UserLinksMemo;

