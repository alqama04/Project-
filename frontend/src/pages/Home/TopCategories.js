import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { MdOutlineAutoAwesomeMosaic } from 'react-icons/md'
import CategoryList from '../../features/store/category/CategoryList';

const TopCategories = () => {
    const { categories } = CategoryList()

    const categoryWithImg = categories.filter((catImg) => catImg.img.length !== 0)
    let content

    content = categoryWithImg.length ? categoryWithImg.map(cat => (
        <Box key={cat._id}
            cursor='pointer'
            shadow='md'
            bg='#fff' rounded='3'
            w={{ base: '160px', sm: '170px' }}
            h={{ base: '120px', sm: '120px' }}
            textAlign='center' p='2'>
            <Image src={cat.img[0].url} objectFit='contain' />
        </Box>
    )) : ""

    return (
        <React.Fragment>
            <Flex gap='1' mt='6' align='center' h='2.1em'
                px='1' rounded='3'
                cursor='pointer'

                fontWeight='medium'>
                <Icon as={MdOutlineAutoAwesomeMosaic} color='red.600'
                    boxSize='6'
                />
                <Text textTransform='capitalize' fontWeight='medium'>top categories</Text>
            </Flex>
            <Flex rounded='3' p='2' justifyContent='center' align='center' flexWrap='wrap' gap='2'>
                {content}
                {content}
                {content}
                {content}
            </Flex>

        </React.Fragment>
    );
}

const TopCategoriesMemo = memo(TopCategories)
export default TopCategoriesMemo;
