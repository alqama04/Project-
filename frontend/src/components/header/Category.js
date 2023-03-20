import { Box, Icon, Flex } from '@chakra-ui/react';
import React, { memo, useRef, useState } from 'react';


import { BsChevronCompactDown } from 'react-icons/bs'
import { MdOutlineAutoAwesomeMosaic } from 'react-icons/md'
const LazyCategoryDropdwon = React.lazy(() => import('../../features/store/category/CategoryDropdwon'))

const Category = () => {
    const [open, setOpen] = useState(false)
    const catMenu = useRef(null)

    const closeOpenMenus = (e) => {
        if (catMenu.current && open && !catMenu.current.contains(e.target)) {
            setOpen(false)
        }
    }
    document.addEventListener('mousedown', closeOpenMenus)

    const content = <React.Suspense fallback='loading...'>
        <LazyCategoryDropdwon setOpen={setOpen} />
    </React.Suspense>
    return (
        <>
            <Box display={{ base: 'none', lg: "block" }} zIndex='100' ref={catMenu} >
                <Flex gap='1' align='center' h='2.1em'
                    bg='#f1f1f1' px='1' rounded='3'
                    cursor='pointer'
                    onClick={() => setOpen(prev => !prev)}
                    fontWeight='medium'>
                    <Icon as={MdOutlineAutoAwesomeMosaic}
                        boxSize='5'
                    />

                    categories
                    <Icon as={BsChevronCompactDown}
                        boxSize='5'
                        transition='all'
                        transitionTimingFunction='ease-in-out'
                        transitionDuration='.3s'
                        mt={open ? '4' : '0'} />
                </Flex>
                <Box zIndex='100'
                    visibility={!open ? "hidden" : "visible"}
                    opacity={!open ? 0 : 1}
                    mt={open ? '8px' : '2pxx`'}
                    w='25em' px='1.5' bg='#fff'
                    pos='absolute' rounded='2'
                    shadow='md'
                    transition='all'
                    transitionTimingFunction='ease-in-out'
                    transitionDuration='.3s'>
                    {content}
                </Box>
            </Box>
        </>
    );
}

const CategoryMemo = memo(Category)
export default CategoryMemo;
