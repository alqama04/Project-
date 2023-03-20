const createError = require('http-errors')
const Discount = require('../../models/store/Discount')


const createDiscount = async (req, res, next) => {
    const { amount, deliveryCharge } = req.body
    if (!amount || !deliveryCharge) return next(createError('all fields are required'))

    const discountData = {
        user: req.user.id,
        maxAmount: Number(amount),
        deliveryCharge: Number(deliveryCharge)
    }


    const discount = await Discount.create(discountData)
    if (!discount) return next(createError.Forbidden('unable to add discount fields , try again'))

    return res.status(201).json({
        success: true,
        message: 'discount added successfully'
    })

}

const getDiscount = async (req, res, next) => {
    const discount = await Discount.find({}, { __v: 0 }).populate("user","name -_id")

    if (!discount.length) return next(createError.NotFound('discount fields does not exist'))

    return res.status(200).json({
        success: true,
        discount
    })
}
const updateDiscount = async (req, res, next) => {
    const { id, amount, deliveryCharge } = req.body
    const discountData = {
        user: req.user.id,
        maxAmount: Number(amount),
        deliveryCharge: Number(deliveryCharge)
    }
    const discount = await Discount.findByIdAndUpdate(id, discountData)
    if (!discount) return next(createError.NotFound('unable to update... fields does not exist'))

    return res.status(201).json({
        success: true,
        message: 'fields updated successfully'
    })
}

const deleteDiscount = async (req, res, next) => {
    const { id } = req.body

    const discount = await Discount.findById(id)

    if (!discount) return next(createError.NotFound('unable to delete.. fields does not exist'))
    await discount.deleteOne()

    return res.status(201).json({
        success: true,
        message: 'discount field deleted successfully'
    })

}

module.exports = {
    createDiscount,
    getDiscount,
    updateDiscount,
    deleteDiscount,

}