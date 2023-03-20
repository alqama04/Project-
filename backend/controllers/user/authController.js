const User = require('../../models/user/User')
const createError = require('http-errors')
const crypto = require('crypto')
const { sendTokenSms } = require('../../utils/sms.js')
const sendToken = require('../../utils/jwtToken.js')
const authLimiter = require('../../middleware/authLimiter.js')
const JWT = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    const { phone, password } = req.body
    if (!phone, !password) return next(createError.BadRequest('all fields are required'))
    const phone_pattern = /[0-9]{10}/
    const result = phone_pattern.test(phone)
    if (!result) return next(createError.BadRequest('invalid phone number'))

    const user = await User.findOne({ phone }).select("+password")

    if (!user) return next(createError.BadRequest('Invalid credentials '))

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) return next(createError.Unauthorized("Invalid credentials"))

    if (!user.verified) return next(createError.Unauthorized("Invalid credentials"))

    authLimiter.resetKey(req.ip)
    sendToken(user, 200, res)

}


const logout = (req, res, next) => {
    const { jwt } = req.cookies
    if (!jwt) return res.status(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    res.json({ message: 'Cookie cleared' })
}

const changePassword = async (req, res, next) => {
    const { id, oldPassword, newPassword, confirmNewPassword } = req.body

    if (!id) return next(createError.BadRequest('user Id Not found'))
    if (!oldPassword, !newPassword, !confirmNewPassword) return next(createError.BadRequest("all fields are required"))
    if (newPassword !== confirmNewPassword) return next(createError.BadRequest("new password and confirm new password didn't match"))

    const user = await User.findById(id).select("+password")
    if (!user) return next(createError.NotFound('User Not Found'))

    const isMatchPassword = await user.comparePassword(req.body.oldPassword)
    if (!isMatchPassword) {
        return next(createError.BadRequest("Incorrect Old Password"))
    }
    user.password = newPassword
    await user.save()
    authLimiter.resetKey(req.ip)

    sendToken(user, 200, res)
}

// // forgot password -->
const forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ phone: req.body.phone })
    if (!user) return next(createError.BadRequest('user with this phone number does not exist'))

    const resetToken = user.generateToken()
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${req.protocol}://localhose:3000/password-reset/${resetToken}`
    const message = `Your password reset Link is :- \n\n ${resetPasswordUrl} '/n' please ignore if haven't requested.`
    try {
        sendTokenSms({
            phone: user.phone,
            message
        })
        return res.status(201).json({ success: true, message: `Password reset Link sent to ${user.phone}` })
    } catch (error) {
        user.verificationToken = undefined
        user.expireverificationToken = undefined
        await user.save({ validateBeforeSave: false })
        return next(createError.Forbidden('something went wrong please try again '))
    }

}

const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token.trim()).digest("hex")

    // const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    console.log(req.body,req.params.token)

    const user = await User.findOne({
        verificationToken: resetPasswordToken,
        expireverificationToken: ({ $gt: Date.now() })
    })

    if (!user) return next(createError.Forbidden())

    if (!req.body.password || !req.body.confirmPassword) return next(createError.BadRequest("all fields are required"))
    if (req.body.password !== req.body.confirmPassword) return next(createError.BadRequest('two password fields does not match'))

    user.password = req.body.password
    user.verificationToken = undefined
    user.expireverificationToken = undefined
    await user.save()

    res.status(200).json({ message: "password updated successfully" })
}

const verifyOtp = async (req, res, next) => {
    const verificationToken = crypto.createHash("sha256").update(req.params.token.trim()).digest("hex")
    const user = await User.findOne({
        verificationToken: verificationToken,
        expireverificationToken: ({ $gt: Date.now() })
    }).exec()

    if (!user) return next(createError.BadRequest("invalid OTP"))
    if (!user.verified) {
        user.verified = true
    }

    user.verificationToken = undefined
    user.expireverificationToken = undefined
    await user.save()
    authLimiter.resetKey(req.ip)
    sendToken(user, 200, res)
}

const resendOtp = async (req, res, next) => {
    const user = await User.findOne({ phone: req.body.phone })
    const verificationToken = user.generateToken()
    await user.save({ validateBeforeSave: false })
    const message = `Your OTP is ${verificationToken} \n only valid for 20 minutes`
    try {
        sendTokenSms({
            phone: user.phone,
            message
        })
        return res.status(200).json({ success: true, message: `opt sent to ${user.phone}` })
    } catch (error) {
        user.verificationToken = undefined
        user.expireverificationToken = undefined
        await user.save({ validateBeforeSave: false })
        return next(createError.Forbidden('something went wrong please try again '))
    }
}

const refresh = (req, res, next) => {
    const cookies = req.cookies
    const refreshToken = cookies.jwt

    if (!refreshToken) return next(createError.ExpectationFailed("Unauthorized User"))

    JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,

        async (err, decoded) => {
            if (err) return next(createError.Forbidden("session expired... please Login again"))
            const user = await User.findById(decoded.id, { _id: 1, name: 1, role: 1 })

            if (!user) return next(createError.NotFound("Invalid token"))

            const accessToken = JWT.sign(
                {
                    "UserInfo": {
                        "id": user._id,
                        "name": user.name,
                        "role": user.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )

            res.json({ accessToken })
        }
    )
}

module.exports = {
    authenticate,
    changePassword,
    forgotPassword,
    resetPassword,
    logout,
    refresh,
    verifyOtp,
    resendOtp
}

