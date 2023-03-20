import { Box, Container, Flex, IconButton, Slide, StackDivider, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { memo } from 'react';
// import { useMemo, useRef } from 'react';
import { BiMenuAltLeft, BiX, } from 'react-icons/bi';
import Brands from './Brands';

const MobileDrawer = () => {

    const { isOpen, onToggle } = useDisclosure()

    const openDrawer = <IconButton variant='iconBtn'
        onClick={onToggle}
        size={{ base: 'sm', sm: 'md' }}
        display={{ base: 'block', md: "block", lg: "none" }}
        icon={<BiMenuAltLeft />}
    />

    const closeDrawer = <IconButton
        onClick={onToggle}
        variant='iconBtn'
        color='#000'
        size='md'
        icon={<BiX />} />

    const drawerMenuList =
        <Box display={{ lg: 'none' }} >
            {openDrawer}
            <Slide direction='left' in={isOpen} style={{ zIndex: 10 }} >
                <Box bg='#f1f1f1' h='100%'>
                    <Flex bg='white' shadow='lg' justify='space-between' pos='fixed' w='100%'>
                        {closeDrawer}   
                        Taaiz
                    </Flex>

                    <Container maxW='99vw' pt='10' h='100vh'>
                        <Text fontSize='.8em' fontWeight='semibold' ml='1.5' mb='0.5'>Shop By</Text>
                        <VStack
                            bg='white'
                            rounded='10'
                            spacing={1}
                            overflow='auto'
                            sx={{ height: '90vh', padding: '0px 0 10px 0' }}
                            divider={<StackDivider borderColor='gray.200'
                            />}>

                            {/* mobile brands toggle */}
                            <Brands toggle={onToggle} />

                            {/* categoies  */}

                        </VStack>
                    </Container>
                </Box>

            </Slide>
        </Box>
    return drawerMenuList
}

const MobileDrawerMemo = memo(MobileDrawer)
export default MobileDrawerMemo;
