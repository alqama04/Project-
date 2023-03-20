import { Text } from '@chakra-ui/react';
import { useGetCategoryQuery } from '../storeApiSlice';
import React, { memo } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';

const CategoryList = (search = '') => {
    const { data, isLoading, isError, error, isSuccess } = useGetCategoryQuery()
    let loading = ''
    let errMsg = ''
    let categories = []
    if (isLoading) loading = <LoadingSpinner />
    if (isError) { errMsg = <Text textAlign='center' color='red.500'>{error.data.message} </Text> }

    if (isSuccess) {
        categories = data.category.filter(cate => cate.name.match(search.toLowerCase()))
        return { loading, errMsg, categories }
    }
    return { loading, errMsg, categories }
}


export default CategoryList

