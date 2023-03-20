import React, { useState } from 'react';
import { Box, Button, Checkbox, Flex, FormLabel, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, Select, SimpleGrid, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { useUpdateProductMutation } from '../../../store/storeApiSlice'
import useToastMsg from '../../../../hooks/useToastMsg';
import { FaRegEdit } from 'react-icons/fa'
import CategoryOptions from '../../../store/category/CategoryOptions';

const UpdateProduct = ({ product }) => {
    const { handleToast } = useToastMsg()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState(product.name)
    const [category, setCategory] = useState(product.category)
    const [subCategory, setSubCategory] = useState(product.sub_category)
    const [mrp, setMrp] = useState(product.mrp)
    const [discount, setDiscount] = useState(product.discount)
    const [skinType, setSkinType] = useState(product.skin_type)
    const [ingredients, setIngredients] = useState(product.ingredients)
    const [weight, setWeight] = useState(product.net_weight)
    const [expiryDate, setExpiryDate] = useState(product.expiry_date)
    const [stock, setStock] = useState(product.stock)
    const [desc, setDesc] = useState(product.description)
    const [rating, setRating] = useState(product.avgRating || 0)
    const [sold, setSold] = useState(product.sold)
    const [utilize, setUtilize] = useState(product.utilize)
    const [images, setImages] = useState([])
    const [bulletPoints, setBulletPoints] = useState(product.bulletPoints || [''])
    const [publicId, setPublicId] = useState([])
    const [keywords, setKeywords] = useState(product.keywords || '')

    const { categoryOption, subCategoryOption } = CategoryOptions(category)


    const [updateProduct, { isLoading }] = useUpdateProductMutation()

    const handlePoints = (val, index) => {
        const newBulletPoints = bulletPoints.map((point, i) => i === index ? val : point)
        setBulletPoints(newBulletPoints)
    }
    const handleCheckImg = (e) => {
        if (publicId.includes(e.target.value)) {
            let filterId = publicId.filter(id => id !== e.target.value)
            setPublicId(filterId)
        } else {
            setPublicId(oldArray => [...oldArray, e.target.value])
        }
    }

    const handleUpdate = async () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('subCategory', subCategory)
        formData.append('mrp', mrp)
        formData.append('discount', discount)
        formData.append('skinType', skinType)
        formData.append('avgRating', rating)
        formData.append('ingredients', ingredients)
        formData.append('weight', weight)
        formData.append('expiryDate', expiryDate)
        formData.append('stock', stock)
        formData.append('desc', desc)
        formData.append('utilize', utilize)
        formData.append('sold', sold)
        formData.append('keywords', keywords)

        Array.from(bulletPoints).forEach(point => { formData.append("bulletPoints", point) })

        Array.from(publicId).forEach(ids => { formData.append("publicId", ids) })

        Array.from(images).forEach(image => { formData.append("files", image) });


        try {
            const data = await updateProduct({ formData, id: product._id }).unwrap()
            if (data) handleToast({ desc: data.message, status: "success" })
        } catch (error) {
            console.log(error)
            handleToast({ desc: error.data.message, status: "error" })
        }
    }

    return (
        <React.Fragment>
            <Box bg='#fff'>

                <IconButton px='2'
                    fontWeight='semibold'
                    fontSize='1.2em'
                    size=''
                    variant='iconBtn'
                    onClick={onOpen}
                    icon={<FaRegEdit />}
                />
                <Modal isOpen={isOpen} onClose={onClose} size='full'>

                    <ModalContent py='4' px='1'>
                        <ModalCloseButton mt='-1.5' />
                        <ModalBody mt='3' px={{ base: "1em", lg: "3em" }}>
                            <SimpleGrid gap='2.5' columns='1'>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Name</FormLabel>
                                    <Input shadow='md' type='text' variant='formInput' value={name} onChange={e => setName(e.target.value)} />
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>category</FormLabel>
                                    <Select className='selectCategory' textTransform='capitalize' shadow='md' onChange={e => setCategory(e.target.value)}>
                                        <option hidden selected>{category}</option>
                                        {categoryOption}
                                    </Select>
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>subCategory</FormLabel>
                                    <Select className='selectCategory' shadow='md' onChange={e => setSubCategory(e.target.value)}>
                                        <option hidden selected>{subCategory}</option>

                                        {subCategoryOption}
                                    </Select>
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Mrp</FormLabel>
                                    <Input shadow='md' type='number' variant='formInput' value={mrp} onChange={e => setMrp(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>discount % </FormLabel>
                                    <Input shadow='md' type='number' variant='formInput' value={discount} onChange={e => setDiscount(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>discounted Price</FormLabel>
                                    <Input shadow='md' type='number' variant='formInput' value={Math.round(mrp - (mrp * discount / 100), 0)} readOnly />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Skin Type</FormLabel>
                                    <Input shadow='md' type='text' variant='formInput' value={skinType} onChange={e => setSkinType(e.target.value)} />
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Average Ratings </FormLabel>
                                    <Input shadow='md' type='number' variant='formInput' value={rating} onChange={e => setRating(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Ingredients</FormLabel>
                                    <Input shadow='md' type='text' variant='formInput' value={ingredients} onChange={e => setIngredients(e.target.value)} />
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>weight <Text as={'span'} color='red.700'>(in grams)</Text></FormLabel>
                                    <Input shadow='md' type='text' variant='formInput' value={weight} onChange={e => setWeight(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Expiry Date ( DD/MM/YY )</FormLabel>
                                    <Input shadow='md' type='text' variant='formInput' value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Stock</FormLabel>
                                    <Input shadow='md' type='Text' variant='formInput' value={stock} onChange={e => setStock(e.target.value)} />
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Sold quantity</FormLabel>
                                    <Input shadow='md' type='Text' variant='formInput' value={sold} onChange={e => setSold(e.target.value)} />
                                </Box>
                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Description</FormLabel>
                                    <Textarea rows='2' shadow='md' px='1' variant='formInput' value={desc} onChange={e => setDesc(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>How to use</FormLabel>
                                    <Textarea rows='2' shadow='md' variant='formInput' px='1' value={utilize} onChange={e => setUtilize(e.target.value)} />
                                </Box>

                                <Box>
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>points </FormLabel>
                                    {
                                        bulletPoints.map((point, index) => {
                                            return (
                                                <Flex key={index} align='center' my='2px'>
                                                    <Input zIndex='1' shadow='md' type='text' value={point} variant='formInput' onChange={e => handlePoints(e.target.value, index)} />
                                                    {bulletPoints.length > 1 ?
                                                        <Button ml='-1.8em' pl='2em' variant='basicBtn' fontSize='0.7em' fontWeight='bold'
                                                            onClick={() => { setBulletPoints(bulletPoints.filter((_, j) => j !== index)) }}
                                                        > &#8212; </Button> : ''
                                                    }
                                                </Flex>
                                            )
                                        })}
                                    <Button variant='solid' mt='2' fontSize='0.7em' onClick={() => setBulletPoints([...bulletPoints, ''])} id='plus'>Add More</Button>
                                </Box>

                                <Box mt='1'>
                                    <FormLabel p='0' m='0' fontSize='1em' pl='1'>Keywords</FormLabel>
                                    <Input shadow='sm' type='text' variant='formInput' placeholder='Keywords' value={keywords} onChange={e => { setKeywords(e.target.value) }} />
                                </Box>

                                <Box >
                                    <FormLabel p='0' m='0' fontSize='0.8em' pl='1'>Add Images</FormLabel>
                                    <Input shadow='md' type='file' variant='formInput'
                                        placeholder='select Images'
                                        multiple accept="image/png, image/jpeg image/jpg"
                                        onChange={e => setImages(e.target.files)}
                                    />
                                </Box>

                                <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={10} mt='2'>
                                    {product.img.length ? product.img.map((picture) => (
                                        <Flex flexDir='column-reverse' gap='2px' bg='blackAlpha.50' key={picture.url}>
                                            <Image src={picture.url} alt={name} />
                                            <Checkbox borderColor='red.500' title='delete' colorScheme='red' children='remove' value={picture.public_id} onChange={handleCheckImg} />
                                        </Flex>
                                    )) : ''}

                                </SimpleGrid>

                            </SimpleGrid>
                        </ModalBody>

                        <ModalFooter >

                            <Button py='4' mr='2.5' isLoading={isLoading} variant='solid' onClick={handleUpdate}>Save</Button>

                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </React.Fragment >
    );
}

export default UpdateProduct;
