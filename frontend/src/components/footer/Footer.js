import { Box, Button, Divider, Flex, Heading, HStack, Icon, IconButton, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { memo } from 'react';
import './footer.css'
import logoImage from '../../images/logo.svg'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaInstagram, FaRegHandPointDown, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <React.Fragment>
        <Box className='footer' color='#fff'>
            <SimpleGrid p='4' columns={{ base: 2, md: 4 }} gap='3' >
                <Box color='#fff'>
                    <Box h='6em' overflow='hidden' >
                        <Image className='logo' src={logoImage} />
                    </Box>
                    <Text fontSize='0.8em'>loremipsu d
                        ollor sit amet is godde the frelow ansd rereight wiend lroem dollor
                        ollor sit amet is godde the frelow ansd rereight wiend lroem dollor
                        e sitm ametei</Text>
                    <Button color='#fff' >ReadMore...</Button>
                </Box>
                <Box className='office' textAlign='left' ml='3'>
                    <Heading className='heading' fontWeight='medium' fontSize='1.1em'>Office</Heading>
                    <Text fontSize='0.8em' mt='5'> ITPS Road whitefield,</Text>
                    <Text fontSize='0.8em'> BangLore</Text>
                    <Text fontSize='0.8em'> Karnakta</Text>
                    <Text fontSize='0.8em'> India</Text>

                    <Flex gap='1' align='center' my='3'> <Icon className='icon' as={AiOutlineMail} boxSize={6} />
                        <a href="mailto:abc@example.com?subject = Feedback&body = Message">
                            Send Feedback
                        </a>
                    </Flex>
                    <Divider />
                    <Flex gap='1' align='center' my='1'>
                        BulK order
                        <Icon className='icon' as={FaRegHandPointDown} boxSize={4} />
                    </Flex>
                    <Flex gap='1' flexWrap='nowrap' align='center' my='1'> <Icon className='icon' as={AiOutlinePhone} boxSize={6} />
                        <a href="tel:+4733378901">12333 78 901</a>
                    </Flex>
                </Box>
                <Box>
                    <Heading className='heading' fontWeight='medium' fontSize='1.1em'>Links</Heading>
                    <VStack mt='5' align='flex-start' justify='center'>
                        <Box>Home</Box>
                        <Box>About Us</Box>
                    </VStack>
                </Box>
                <Box>
                    <Heading className='heading' fontWeight='medium' fontSize='1.1em'>Social links</Heading>
                    <HStack mt='5' gap='3'>
                        <IconButton variant={'iconBtn'} className='social-icons' icon={<FaInstagram />} />
                        <IconButton variant={'iconBtn'} className='social-icons' icon={<FaWhatsapp />} />
                    </HStack>
                </Box>
            </SimpleGrid>
        </Box>
        </React.Fragment>
    );
}

const FooterMemo = memo(Footer)
export default FooterMemo;
