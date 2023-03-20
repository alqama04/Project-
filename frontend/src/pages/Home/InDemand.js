import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import StarRating from "../../components/StarRating";
import FreemodeSlide from "../../components/swiper/FreemodeSlide";
import { VscGraph } from 'react-icons/vsc'
import './Home.css'
const InDemand = () => {

    let image = [
        'https://cdn.magloft.com/github/swiper/images/page-001.jpg',
        'https://res.cloudinary.com/dvvzcnjyw/image/upload/v1676626206/products/mlnuxzrtjtzpgzmowny1.png',
        'https://cdn.magloft.com/github/swiper/images/page-002.jpg',
        'https://cdn.magloft.com/github/swiper/images/page-003.jpg',
        'https://cdn.magloft.com/github/swiper/images/page-004.jpg',
        'https://cdn.magloft.com/github/swiper/images/page-005.jpg',
    ]

    let content
    content = image.map((img, i) => (
        <Box key={i} pb='3'>
            <Box bg='#fff' p='2' rounded='3' shadow='md' className="inDemand" >
                <Text bg='red.600' mt='-1' color='#fff' rounded='full' px='1.5' pos='absolute' fontSize='0.8em'>25% off</Text>
                <Image src={img} mt='1' objectFit='contain' p={{ base: '1em' }} mx='auto' alt='Image Name' />

                <Flex flexDir='column' gap='1' className="inDemandContent" >
                    <Text fontWeight='medium'>Name is Here</Text>

                    <StarRating {...{ rating: 4.5, size: 4, color: "#FFCB42" }} />

                    <Flex justify='space-between' align='flex-start'>
                        <Text color='red.600' fontWeight='medium'>123.00</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    ))

    return (
        <Box w='100%' mt='2.5em' >
            <Flex align='center' gap='1'>
                <Icon as={VscGraph} color='#D61C4E' boxSize='6' />
                <Heading fontSize='1em' fontWeight='medium'>InDemand</Heading>
            </Flex>

            <Box pt='4' mt='-3'>
                <FreemodeSlide {...{ data: content, nav: true }} />
            </Box>
        </Box>

    );
}


export default InDemand