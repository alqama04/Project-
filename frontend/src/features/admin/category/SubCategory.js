import { Button, Modal, useDisclosure, ModalBody, ModalContent, ModalOverlay, Flex, ModalHeader, IconButton } from '@chakra-ui/react';
import React from 'react';
import UpdateSubCat from './UpdateSubCat';
import { AiFillCloseCircle } from 'react-icons/ai'
import DelSubCategory from './DelSubCategory';
const SubCategory = ({ subCategory, cateId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <React.Fragment>
            <Button fontWeight='medium' onClick={onOpen} >View</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>

                    <ModalBody p='2.5' bg='#fff'>
                        <IconButton onClick={onClose} right='0' mr='-1.4em' pos='absolute' mt='-1em' color='#fff' fontWeight='bold' fontSize='1.7em' icon={<AiFillCloseCircle />} />
                        {subCategory.length ? subCategory.map(subCat => (
                            <Flex my='1.5' key={subCat._id}>
                                <UpdateSubCat {...{ name: subCat.name, cateId, subCatId: subCat._id }} />
                                <DelSubCategory {...{ cateId, subCatId: subCat._id,subCatName:subCat.name }} />
                            </Flex>
                        )) : ''}

                    </ModalBody>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}

export default SubCategory;
