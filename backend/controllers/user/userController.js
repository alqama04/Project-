const User = require('../../models/user/User')
const createError = require('http-errors')
const { sendTokenSms } = require('../../utils/sms')


// register User 
exports.register = async (req, res, next) => {
    const { name, phone, password } = req.body
    if (!name || !phone || !password) return next(createError.BadRequest('all fields are required'))

    const phone_pattern = /[0-9]{10}/
    const result = phone_pattern.test(phone)
    if (!result) return next(createError('invalid phone number'))
    let user
    const duplicate = await User.findOne({ phone }).lean().exec()
    if (duplicate && duplicate.verified) return next(createError('phone number already exist'))
    if (duplicate && !duplicate.verified) {
        await User.findByIdAndDelete(duplicate._id)
    }
    user = await User.create({ name, phone, password })
    const verificationToken = user.generateToken()
    await user.save({ validateBeforeSave: false })
    const verifcationUrl = `${req.protocol}://${req.get("host")}/auth/verify/${verificationToken}`
    const message = `Your password reset Link is :- \n\n ${verifcationUrl} '/n' please ignore if haven't requested.`
    try {
        sendTokenSms({
            phone: user.phone,
            message
        })
        return res.status(201).json({ success: true, message: `Verification Link send to ${user.phone}` })
    } catch (error) {
        user.verificationToken = undefined
        user.expireverificationToken = undefined
        await user.save({ validateBeforeSave: false })
        return next(createError.Forbidden('something went wrong please try again '))
    }

}

exports.profile = async (req, res, next) => {
    const { id } = req.params
    if (!id) return next(createError.BadRequest('user Id is required'))

    const user = await User.findById(id)
    return res.status(200).json({ success: true, user })


}

exports.updateProfile = async (req, res, next) => {
    const { name, phone, password } = req.body

    if (!name, !phone, !password) return next(createError.BadRequest('all fields are required'))

    const phone_pattern = /[0-9]{10}/
    const result = phone_pattern.test(phone)

    if (!result) return next(createError.BadRequest('invalid phone number'))

    const user = await User.findById(req.params.id).select("+password").exec()

    if (!user) return next(createError.BadRequest('Invalid user '))

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) return next(createError.Unauthorized("Invalid Password"))


    if (user.phone !== phone) {
        user.previousPhone = user.phone

        user.phone = phone
        user.name = name
        user.verified = false

        const verificationToken = user.generateToken()
        await user.save({ validateBeforeSave: false })

        const verifcationUrl = `${req.protocol}://${req.get("host")}/auth/verify/${verificationToken}`
        const message = `Your password reset Link is :- \n\n ${verifcationUrl} '/n' please ignore if haven't requested.`
        console.log(message)
        try {
            sendTokenSms({
                phone: user.phone,
                message
            })
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

            return res.status(201).json({ success: true, message: `Please Verify your Phone Number  ${user.phone}` })
        } catch (error) {
            user.verificationToken = undefined
            user.expireverificationToken = undefined
            await user.save({ validateBeforeSave: false })
            return next(createError.Forbidden('something went wrong please try again '))
        }

    } else {
        user.name = name
        user.save({ validateBeforeSave: false })
        return res.status(200).json({ success: true, message: 'profile Update successfully', user })
    }


}




// admin route or staff route
exports.getUsers = async (req, res, next) => {
    let { search, name, active, verified, role, page, sort } = req.query
    let queryObject = {}

    if (search) {
        queryObject = {
            $or: [
                { name: { $regex: search.trim(), $options: 'i' } },
                { phone: { $regex: search.trim(), $options: 'i' } }
            ]
        }
    }

    if (verified) queryObject.verified = verified
    if (name) queryObject.name = name
    if (active) queryObject.active = active
    if (role) queryObject.role = { $regex: role.trim(), $options: 'i' }

    const limit = 50
    page = !page || page <= 0 ? page = 1 : Number(page)
    const skip = limit * (page - 1)
    if (sort) {
        sort = sort.replace(',', ' ')
    } else {
        sort = '-createdAt'
    }

    const users = await User.find(queryObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)

    if (!users?.length) return next(createError.NotFound('no Records found'))
    res.status(200).json({ users })
}

//admin route
exports.userDetail = async (req, res, next) => {
    console.log('function called')
    const { id } = req.params
    console.log(id)
    const user = await User.findById(id)
    if (!user) return next(createError.NotFound('User does not exist'))

    res.status(200).json({ user })
}



// admin route 
const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) return next(createError.BadRequest("User Not Found"))
    await user.delete()
    res.status(200).json({ message: `${user.email} deleted successfully` })
}



