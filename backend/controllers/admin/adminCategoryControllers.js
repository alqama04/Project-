const Category = require('../../models/store/Categories')
const createError = require('http-errors')
const getDataUri = require('../../utils/dataUri')
const cloudinary = require('cloudinary')
const Categories = require('../../models/store/Categories')

const createCategory = async (req, res, next) => {
    if (!req.body.name) return next(createError.BadRequest('name is required'))

    const files = req.files
    let imageLinks = []

    const duplicate = await Category.findOne({ name: req.body.name })
    if (duplicate) return next(createError.Conflict(`${req.body.name} is already exist`))

    if (files.length) {

        const fileUri = getDataUri(files)
        let myCloudPromise = fileUri.map((picture) =>
            cloudinary.v2.uploader.upload(picture, { folder: "categories" })
        );
        const myCloud = await Promise.all(myCloudPromise)

        for (let i in myCloud) {
            imageLinks.push({
                public_id: myCloud[i].public_id,
                url: req.protocol === 'http' ? myCloud[i].url : myCloud[i].secure_url
            })
        }
    }
    const categoryData = {
        name: req.body.name,
        img: imageLinks,
        user: req.user.id
    }

    await Category.create(categoryData)

    return res.status(201).json({
        success: true,
        message: `${categoryData.name} is added successfully`
    })
}


const updateCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    const { name, publicId } = req.body
    if (!category) return next(createError.NotFound("requested brand does not exist"))
    const duplicate = await Category.findOne({ name: name })
    if (duplicate && duplicate.name !== category.name) return next(createError.Conflict(`${req.body.name} is already exist`))

    const files = req.files
    let imageLinks = []
    let filterImage = []
    if (publicId) {
        filterImage = category.img.filter(img => !publicId.includes(img.public_id))
        let myCloudPromise = category.img.map((picture) => (publicId.includes(picture.public_id)) ? cloudinary.v2.uploader.destroy(picture.public_id) : '')
        await Promise.all(myCloudPromise)
    }

    if (files.length) {
        const fileUri = getDataUri(files)
        let myCloudPromise = fileUri.map((picture) =>
            cloudinary.v2.uploader.upload(picture, { folder: "categories" })
        );
        const myCloud = await Promise.all(myCloudPromise)

        for (let i in myCloud) {
            imageLinks.push({
                public_id: myCloud[i].public_id,
                url: req.protocol === 'http' ? myCloud[i].url : myCloud[i].secure_url
            })
        }
    }


    if (!filterImage.length && publicId) category.img = []

    if (filterImage.length) category.img = filterImage


    if (imageLinks.length) category.img = [...imageLinks, ...category.img]

    category.name = req.body.name

    category.user = req.user.id
    category.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: `${category.name} updated successfully `
    })
}

const deleteCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) return next(createError.NotFound("requested category does not exist"))

    if (category.img.length) {
        let myCloudPromise = category.img.map((picture) =>
            cloudinary.v2.uploader.destroy(picture.public_id)
        );
        await Promise.all(myCloudPromise)
    }
    await category.delete()
    res.status(200).json({
        success: true,
        message: `${category.name} deleted successfully`
    })
}


// subCategory

const addSubCategory = async (req, res, next) => {
    const { cateId, subCateName, subCatId } = req.body
    const category = await Category.findById(cateId)
    const duplicate = category.subCategory.find(subCat => subCat.name.toLowerCase() === subCateName.toLowerCase())
    if (duplicate) return next(createError.Conflict(`${subCateName} already exist`))
    const data = {
        user: req.user.id,
        name: subCateName
    }
    // upsert 
    if (subCatId) {
        const isSubCate = category.subCategory.find(
            (subCat) => subCat._id.toString() === subCatId
        );
        if (isSubCate) {
            category.subCategory.forEach(subCat => {
                if (subCat._id.toString() === subCatId.toString())
                    (subCat.name = subCateName), (subCat.user = req.user.id)
            })

        }

    } else if (!subCatId) { category.subCategory.push(data) }

    await category.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true,
        message: `${subCateName} Added successfully `
    })
}


const deleteSubCategory = async (req, res, next) => {
    const { cateId, subCatId, subCatName } = req.body

    if (!subCatId || !cateId) return next(createError.BadRequest('category and subCategory id are required'))

    const category = await Categories.findById(cateId)
    if (!category) return next(createError.NotFound('category does not exist'))
    if (!category.subCategory.length) return next(createError.NotFound('subCategory does not exist'))

    const subCategories = category.subCategory.filter(subCate => subCate._id.toString() !== subCatId)


    category.subCategory = subCategories

    await category.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: `${subCatName} deleted successfully `
    })

}


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    deleteSubCategory

}