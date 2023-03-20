import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAddSubCategoryMutation } from '../../store/storeApiSlice';
import CategoryList from '../../store/category/CategoryList'
import LoadingSpinner from '../../../components/LoadingSpinner';

const AddSubCategory = () => {
    const { categories } = CategoryList()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [cateId, setCateId] = useState('')
    const [subCateName, setSubCateName] = useState('')

    const [addSubCategory, { isLoading }] = useAddSubCategoryMutation()
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    useEffect(() => {
        setErrMsg('')
        setSuccessMsg('')
    }, [cateId, subCateName])

    const handleCategory = async () => {
        try {
            const { message } = await addSubCategory({ cateId, subCateName }).unwrap()
            setSuccessMsg(message)
        } catch (error) {
            console.log(error)
            setErrMsg(error.data.message)
        }
    }

    const content = <SimpleGrid columns='1' gap='4'>

        <Select placeholder='Select Category'
            textIndent='3px' variant='unstyled'
            lineHeight='40px' rounded='0'
            border='2px' borderColor='#fff'
            bg='#f1f1f1' shadow='md'
            _focus={{ shadow: "none", outline: "none", borderColor: '#f1f1f1' }}
            onChange={e => setCateId(e.target.value)}
        >
            {categories ? categories.map(cate => (
                <option key={cate._id} value={cate._id}>{cate.name}</option>
            )) : ""}
        </Select>

        <FormControl>
            <FormLabel>SubCategory</FormLabel>
            <Input type='text'
                variant='formInput'
                placeholder='Subcategory name'
                value={subCateName}
                onChange={(e) => setSubCateName(e.target.value)} />
        </FormControl>

    </SimpleGrid>

    return (
        <Box>
            <Button variant='blackBtn' onClick={onOpen}>Add SubCategory</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>Add SubCategory</ModalHeader>
                    <ModalBody>
                        {errMsg ? <Text textTransform='capitalize' textAlign='center' fontSize='0.7em' mb='1.5' color='red.500'>{errMsg}</Text> :
                            successMsg ? <Text textTransform='capitalize' textAlign='center' fontSize='0.7em' mb='1.5' color='green.500'>{successMsg}</Text> : ""
                        }
                        {content}
                    </ModalBody>
                    <ModalFooter >
                        {!isLoading ?
                            <Button variant='blackBtn' py='4' mr='4' w='-webkit-max-content' px='3' onClick={handleCategory}>Save</Button>

                            : <Button variant='blackBtn' py='4' mr='4' w='-webkit-max-content' px='3'><LoadingSpinner color={'#fff'} /></Button>
                        }

                        <Button onClick={onClose} py='4' variant='blackBtn'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AddSubCategory;
