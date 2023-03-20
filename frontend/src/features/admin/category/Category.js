import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import AddCategory from './AdCategory';
import AddSubCategory from './AddSubCategory';
import UpdateCategory from './UpdateCategory';
import CategoryList from '../../store/category/CategoryList'
import DelCategory from './DelCategory';
import LoadingSpinner from '../../../components/LoadingSpinner';
const SubCategory = React.lazy(() => import('./SubCategory'));

const Category = () => {

    const { categories, loading, errMsg } = CategoryList()

    let content
    if (loading !== '') content = <Tr><Td colSpan='6'>{loading}</Td></Tr>
    if (errMsg !== '') content = <Tr><Td colSpan='10'>{errMsg}</Td></Tr>

    if (categories) {
        content = categories.map((cate) => (
            <Tr key={cate._id} >
                <Td>
                    {cate.img.length ?
                        <Image src={cate.img[0].url} objectFit='contain' boxSize={{ sm: "60px" }} />
                        : 'No Image'
                    }
                </Td>
                <Td>{cate.name}</Td>

                <Td>
                    {cate.subCategory.length ?
                        <React.Suspense fallback={
                            <Flex justify='center' align='center' w='full' h='full'><LoadingSpinner /></Flex>
                        }>
                            <SubCategory {...{ subCategory: cate.subCategory, cateId: cate._id }} />
                        </React.Suspense>
                        : ''}
                </Td>
                <Td>
                    {new Date(cate.createdAt).toLocaleString()}
                </Td>

                <Td>{cate.user.name}</Td>

                <Td>
                    <Flex gap='3' align='center'>
                        <UpdateCategory {...{ name: cate.name, img: cate.img, id: cate._id }} />
                        <DelCategory {...{ name: cate.name, id: cate._id }} />

                    </Flex>
                </Td>
            </Tr>
        ))
    }

    return (
        <>
            <Box bg='#fff' ml='0.5' p='2'>
                <Flex mx='8' mb='2' gap='4'>
                    <AddCategory />
                    <AddSubCategory />
                </Flex>
                <Divider />
                <TableContainer rounded='4px' py='1' w='100%'>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Image</Th>
                                <Th>category</Th>
                                <Th>subCategory</Th>
                                <Th>createdAt</Th>
                                <Th>createdBy</Th>
                                <Th>action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {content}
                        </Tbody>

                    </Table>
                </TableContainer>
            </Box>

        </>

    );
}

export default Category;



// {categories ? categories.map(cate => (
//     <option key={cate._id}>{cate.name}</option>
// )) : ""}