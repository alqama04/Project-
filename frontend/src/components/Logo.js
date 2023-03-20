import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import logoImage from '../images/logo.svg'

const Logo = ({ w, h }) => {
    const logo =
        <Flex align='center' as={NavLink} to="/" w={w} h={h}
            overflow='hidden'
        >
            <Image
                src={logoImage} alt='GLowhite Herbals'
                h='6em'
                p={{base:'1.5' ,md:"0"}}
                objectFit='cover'
            />
        </Flex>
    return logo
}

const LogoMemo = memo(Logo)
export default LogoMemo;
