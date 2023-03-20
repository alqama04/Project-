import { Box, Button, Collapse, Divider, Flex, Icon, Input, Text } from "@chakra-ui/react"
import React, { memo, useState } from "react"
import useNavigateSearch from "../../../hooks/useNavigateSearch "
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import CategoryList from "./CategoryList"

const CategoryDropdwon = ({ setOpen }) => {
    const navigateSearch = useNavigateSearch()
    const [showSub, setShowSub] = useState('')
    const [filterCate, setFilterCat] = useState('')
    const { loading, errMsg, categories } = CategoryList(filterCate)
    const searchCateogory = (e) => {
        if (showSub) {
            setShowSub('')
            navigateSearch('/products', { category: showSub, subCategory: e.target.value })
        } else if (!showSub) {
            navigateSearch('/products', { category: e.target.value })
        }
        setOpen(false)
    }
    const showSubCateogry = (e) => {
        if (showSub === e.target.id) setShowSub('')
        else {
            setShowSub(e.target.id)
        }
    }

    let content
    if (loading !== '') content = loading
    if (errMsg !== '') content = errMsg

    content = <React.Fragment> <Box bg='#fff' py='2px'>
        <Text fontSize='.7em' px='2' fontWeight='semibold' textTransform='uppercase'>Categories</Text>
        <Box bg='#f1f1f1' rounded='4' p='1.5' my='1' h='100%'>
            <Input placeholder='search Category' py='1.5' shadow='sm' bg='#fff' rounded='2' onChange={e => setFilterCat(e.target.value.trim())} />
            <Flex gap='1' flexDir='column' mt='1'>
                {categories ? categories.map(category => {
                    return (
                        <Box key={category._id} >
                            {!category.subCategory.length ?
                                <React.Fragment>
                                    <Input
                                        cursor='pointer'
                                        px='1'
                                        bg='#f1f1f1'
                                        readOnly
                                        lineHeight='0'
                                        onClick={searchCateogory}

                                        textTransform='capitalize'
                                        value={category.name} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button
                                        justifyContent='space-between'
                                        variant={'ghost'}
                                        alignItems='center'
                                        w='full'
                                        cursor='context-menu'
                                        size='' fontSize='.9em'
                                        px='1'
                                        py='.5em'
                                        onClick={showSubCateogry}
                                        id={category.name}
                                        fontWeight='medium'>{category.name}
                                        <Icon bg='transparent' color='star' shadow='lg' as={showSub !== category.name ? AiOutlinePlus : AiOutlineMinus} />
                                    </Button>

                                    <Collapse in={showSub === category.name ? true : false} animateOpacity>
                                        <Box bg='#fff' rounded='3'>
                                            {
                                                category.subCategory.map(subCat => (
                                                    <React.Fragment key={subCat._id}>
                                                        <Divider />
                                                        <Input
                                                            cursor='pointer'
                                                            px='4'
                                                            readOnly
                                                            bg='transparent'
                                                            lineHeight='0'
                                                            textTransform='capitalize'
                                                            onClick={searchCateogory}
                                                            value={subCat.name}
                                                        />
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Box>
                                    </Collapse>
                                    <Divider h='1.6px' bg='#fff' />
                                </React.Fragment>
                            }
                        </Box>)
                })
                    : ''}
            </Flex>
        </Box>
    </Box>
    </React.Fragment>
    return content
}


const CategoryDropdwonMemo = memo(CategoryDropdwon)
export default CategoryDropdwonMemo