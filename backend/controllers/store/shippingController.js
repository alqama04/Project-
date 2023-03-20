const createError = require('http-errors')
const ShippingInfo = require('../../models/user/ShippingInfo')

exports.upsertShippingInfo = async (req, res, next) => {
    const { id, address, locality, landMark, city, state, pinCode, phone, email } = req.body
    const isValidData = [address, locality, landMark, city, state, pinCode, phone, email].every(Boolean)
    if (!isValidData) return next(createHttpError.BadRequest('all fields are required'))

    if (phone.length !== 10 || !Number(phone)) return next(createError.BadRequest('enter 10 digit phone number'))
    if (pinCode.length !== 6 || !Number(pinCode)) return next(createError.BadRequest('enter 6 digit pincode'))

    await ShippingInfo.findOneAndUpdate({ user: id }, req.body, { upsert: true })
    return res.status(200).json({
        success: true,
        message: 'delivery info added successfully'
    })
}
