const Categories = require('../../models/store/Categories')
const createError = require('http-errors')


const getCategory = async (req, res, next) => {
    const category = await Categories.find().populate('user')
    if (!category?.length) return next(createError.NotFound('No Categories Found'))
    return res.status(200).json({
        category
    })
}

module.exports = {
    getCategory
}