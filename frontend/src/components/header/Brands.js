import { Box, Collapse, Flex, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

const Brands = () => {
    const { isOpen, onToggle } = useDisclosure()
    const brand = [{ name: 'loreal paris' }, { name: 'lakme' }, { name: 'aroma' }, { name: 'streax' }, { name: 'brand 5' }, { name: 'brand 5' }, { name: 'brand 5' }, { name: 'brand 5' },]

    const setBrandName = (e) => {
        let a = e.target.value
        console.log(a)
    }
    const [search, setSearch] = useState('')
    const data = brand.filter(brand => {
        return brand.name.toLowerCase().match(search.toLowerCase())
    })

    return (
        <Box w='100%' p='0.5' px='2'>
            <Flex align='center' justify='space-between'>
                <Text fontWeight='semibold'>Brands </Text>
                <IconButton
                    onClick={onToggle}
                    variant='solid'
                    size='sm'
                    color={isOpen ? "red.500" : ''}
                    icon={isOpen ? <BiMinus /> : <BiPlus />}
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity >
                <Box bg='#f1f1f1' rounded='lg' p='2' height='auto' maxH='15em' overflowY='auto'>
                    <Input placeholder='search Brand' bg='#fff' rounded='lg' onChange={e=>setSearch(e.target.value)}/>
                    <Flex align='left' flexDir='column' gap='3' w='100%' mt='2'>
                        {
                            data.length ? data.map((data, i) =>
                                <Box key={i} >
                                    <Input
                                        readOnly={true}
                                        p='1'
                                        lineHeight='0'
                                        borderBottom='1px solid #f9f9f9'
                                        bg='transparent'
                                        value={data.name}
                                        onClick={setBrandName} />
                                </Box>
                            ) : <Text color='red.700' fontSize='small'>Not Found</Text>
                        }
                    </Flex>
                </Box>
            </Collapse>
        </Box>
    );
}

const memoizedBrand = memo(Brands)

export default memoizedBrand
