const Product = require('../../models/store/Product')
const createError = require('http-errors')
const Review = require('../../models/store/Reviews')
const Cart = require('../../models/store/Cart')

const getProduct = async (req, res, next) => {

    let { search, name, category, subCategory, brand, limit, page, discount, lte, gte, sort } = req.query
    let queryObject = {}
    if (search) {
        queryObject = {
            $or: [
                { name: { $regex: search.trim(), $options: 'i' } },
                { category: { $regex: search.trim(), $options: 'i' } },
                { keywords: { $regex: search.trim(), $options: 'i' } },
            ]
        }
    }
    if (name) queryObject.name = { $regex: name.trim(), $options: 'i' }
    if (category) queryObject.category = { $regex: category.trim(), $options: 'i' }
    if (subCategory) queryObject.sub_category = { $regex: subCategory.trim(), $options: 'i' }
    if (discount) queryObject.discount = { $gte: Number(discount) }

    if (lte && gte) {
        queryObject.discounted_price = { $gte: Number(gte), $lte: Number(lte) }   // get 10 --> lte 100
    }

    // pagination
    const productLimit = !limit || limit <= 0 ? limit = 10 : Number(limit)
    page = !page || page <= 0 ? page = 1 : Number(page)
    const skip = productLimit * (page - 1)
    // sorting
    if (sort) {
        sort = sort.replace(',', ' ')
    } else {
        sort = '-avgRating'
    }
    let product
    product = await Product.find(queryObject, { __v: 0 })
        .populate('user')
        .limit(productLimit)
        .skip(skip)
        .sort(sort)

    if (!product.length) return next(createError.NotFound('No items found'))

    return res.status(200).json({
        product,
    })
}


const singleProduct = async (req, res, next) => {
    const id = req.params.id
    const userId = req.query.userId
    console.log(id)

    let productInCart = false
    const product = await Product.findById(id)

    if (!product) return next(createError.NotFound('Product Not Found'))

    if (userId) {
        const cartItem = await Cart.findOne({ user: userId, product: id })
        if (cartItem) {
            productInCart = true
        }
    }

    const reviews = await Review.find({ product: id })
        .populate('user', { name: 1 })
        .populate('product', { name: 1 })
        .sort('-createdAt')

    return res.status(200).json({
        product, reviews, productInCart

    })
}


// create review lgoin required

const addReview = async (req, res, next) => {
    const { prodId, rating, review_title, review, recommend } = req.body

    if (!prodId || !rating || !review_title || !review) return next(createError.BadRequest('all fields are required'))
    const reviewData = {
        user: req.user.id,
        product: prodId,
        rating: Number(rating),
        review_title,
        review: review,
        recommend
    }


    const product = await Product.findById(prodId, { _id: 1, avgRating: 1 })
    if (!product) return next(createError.NotFound('unable to add review, product does not exist'))
    const rev = await Review.findOneAndUpdate(
        { user: reviewData.user, product: reviewData.product },
        reviewData,
        { upsert: true, new: true }
    )

    const findRatings = await Review.find({ product: prodId })

    let totalRating = 0

    findRatings.forEach(rating => {
        totalRating += rating.rating
    })

    product.avgRating = totalRating / findRatings.length
    product.save({ validateBeforeSave: false })

    rev.save({ validateBeforeSave: false })

    return res.status(201).json({
        message: 'review addedd successfully',
        rev
    })
}

const getReview = async (req, res, next) => {

}

//deleter Review

const deleteReview = async (req, res, next) => {
    const { revId, userId, prodId } = req.body

    const delReview = await Review.findOneAndDelete({ _id: revId, user: userId })
    if (!delReview) return next(createError.NotFound('review does not exist.'))

    const review = await Review.find({ product: prodId })

    const product = await Product.findById(prodId)

    let totalRating = 0

    review.forEach(rating => {
        totalRating += rating.rating
    })
    product.avgRating = totalRating / review.length
    product.save({ validateBeforeSave: false })

    res.status(200).json({
        message: "review deleted"
    })
}

module.exports = {
    getProduct,
    singleProduct,
    addReview,
    getReview,
    deleteReview
}