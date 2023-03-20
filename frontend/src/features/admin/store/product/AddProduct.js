import React, { useMemo, useState } from 'react';
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Text, Textarea } from '@chakra-ui/react'
import './store.css'
import { useAddProductMutation } from '../../../store/storeApiSlice';
import LoadingSpinner from '../../../../components/LoadingSpinner'
import useToastMsg from '../../../../hooks/useToastMsg';
import CategoryOptions from '../../../store/category/CategoryOptions';


const AddProduct = () => {
    const { handleToast } = useToastMsg()
    const { categoryOption, subCategoryOption } = CategoryOptions()






    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [mrp, setMrp] = useState('')
    const [discount, setDiscount] = useState('')
    const [stock, setStock] = useState('')
    const [desc, setDesc] = useState('')
    const [skinType, setSkinType] = useState('')
    const [netWeight, setNetWeight] = useState('')
    const [expiry, setExpiry] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [bulletPoints, setBulletPoints] = useState()
    const [utilize, setUtilize] = useState('')
    const [images, setImages] = useState([])
    const [keywords, setKeywords] = useState('')

    const discounted_price = useMemo(() => {
        return Math.round(Number(mrp - (mrp * discount / 100)), 0)
    }, [mrp, discount])

    const [addProduct, { isLoading }] = useAddProductMutation()

    const saveProduct = async () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('sub_category', subCategory)
        formData.append('mrp', mrp)
        formData.append('discount', discount)
        formData.append('discounted_price', discounted_price)
        formData.append('bulletPoints', bulletPoints)
        formData.append('stock', stock)
        formData.append('description', desc)
        formData.append('skin_type', skinType)
        formData.append('net_weight', netWeight)
        formData.append('expiry_date', expiry)
        formData.append('ingredients', ingredients)
        formData.append('utilize', utilize)
        formData.append('keywords', keywords)

        Array.from(images).forEach(image => {
            formData.append("files", image);
        });

        try {
            const data = await addProduct(formData).unwrap()

            if (data) {
                // navigate(Navigations.dashProductList)
                handleToast({ desc: data.message, status: "success" })
            }
        } catch (error) {
            console.log(error.data.message)
            handleToast({ desc: error.data.message, status: "error" })
        }

    }

    return (
        <Box bg='#fff'>

            <Flex justify='center'>
                <Box action='' style={{ width: '100%', padding: "5px 10px" }}>
                    <Box shadow='lg' p='2'>
                        <Heading fontSize='1.5em'>Add Products</Heading>
                        <Divider />
                        <SimpleGrid columns={{ base: '1', sm: "1", md: "1" }} spacing={2}>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Name</FormLabel>
                                <Input shadow='sm' type='text' variant='formInput' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Category</FormLabel>
                                <Select className='selectCategory' shadow='sm' placeholder='-------' value={category} onChange={e => setCategory(e.target.value)}>
                                    {categoryOption}
                                </Select>
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>sub-category</FormLabel>
                                <Select className='selectCategory' shadow='sm' placeholder='-------' value={subCategory} onChange={e => setSubCategory(e.target.value)}>
                                    {subCategoryOption}
                                </Select>
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>MRP(Rs.)</FormLabel>
                                <Input shadow='sm' type='number' variant='formInput' placeholder='MRP' value={mrp} onChange={e => setMrp(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Discount(%)</FormLabel>
                                <Input shadow='sm' type='number' variant='formInput' placeholder='Discount Percent' value={discount} onChange={e => setDiscount(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Discounted Price</FormLabel>
                                <Input shadow='sm' type='number' variant='formInput' placeholder='Discounted Price' value={discounted_price} readOnly />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Skin Type</FormLabel>
                                <Input shadow='sm' type='text' variant='formInput' placeholder='Discounted Price' value={skinType} onChange={e => setSkinType(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Ingredients</FormLabel>
                                <Input shadow='sm' type='text' variant='formInput' placeholder='Ingredients' value={ingredients} onChange={e => setIngredients(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>weight <Text as={'span'} color='red.700'>(in grams)</Text></FormLabel>
                                <Input shadow='sm' type='text' variant='formInput' placeholder='example 100gm' value={netWeight} onChange={e => setNetWeight(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Expiry Date</FormLabel>
                                <Input shadow='sm' type='date' variant='formInput' placeholder='Expirey Date' value={expiry} onChange={e => setExpiry(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Stock</FormLabel>
                                <Input shadow='sm' type='number' variant='formInput' placeholder='Stock' value={stock} onChange={e => { setStock(e.target.value) }} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Description</FormLabel>
                                <Textarea rows='1' px='1' shadow='sm' variant='formInput' placeholder='description' value={desc} onChange={e => setDesc(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>points <Text as={'span'} color='red.700'>(use "<b>__</b>" for separation)</Text></FormLabel>
                                <Textarea rows='1' variant='formInput' shadow='sm' px='1' placeholder='bullet Points' value={bulletPoints} onChange={e => setBulletPoints(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>How to use</FormLabel>
                                <Textarea rows='1' variant='formInput' shadow='sm' px='1' placeholder='how to use the product' value={utilize} onChange={e => setUtilize(e.target.value)} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Keywords</FormLabel>
                                <Input shadow='sm' type='text' variant='formInput' placeholder='Keywords' value={keywords} onChange={e => { setKeywords(e.target.value) }} />
                            </FormControl>

                            <FormControl mt='1'>
                                <FormLabel p='0' m='0' fontSize='1em' pl='1'>Images</FormLabel>
                                <Input shadow='sm' type='file' variant='formInput'
                                    placeholder='select Images' onChange={e => setImages(e.target.files)}
                                    multiple accept="image/png, image/jpeg image/jpg" />
                            </FormControl>

                        </SimpleGrid>
                        <Button variant='blackBtn' type='' px='4' mt='5' onClick={saveProduct}> {isLoading ? <LoadingSpinner color={'#fff'} /> : "save"} </Button>
                    </Box>
                </Box>
            </Flex >
        </Box >
    );
}

export default AddProduct;
