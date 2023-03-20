import React, { memo } from 'react';
import CategoryList from './CategoryList'

const CategoryOptions = (selectedCatgory = '') => {

    let categoryOption;
    let subCategoryOption
    const { categories, loading, errMsg } = CategoryList()
    if (loading) categoryOption = loading
    if (errMsg) categoryOption = errMsg


    categoryOption = categories ? categories.map(cat => (
        <React.Fragment key={cat._id}>
            <option>{cat.name}</option>
        </React.Fragment>
    )) : ""


    if (selectedCatgory) {
        let findCategory = categories.find(cat => cat.name === selectedCatgory)

        if (findCategory) {
            if (findCategory.subCategory.length) {
                subCategoryOption = findCategory.subCategory.map(subcat => (
                    <option key={subcat._id}>{subcat.name}</option>
                ))
            } else subCategoryOption = <option label='' value=''></option>
        }
    } else subCategoryOption = <option disabled>please select category</option>


    return { categoryOption, subCategoryOption }
}

export default CategoryOptions;
