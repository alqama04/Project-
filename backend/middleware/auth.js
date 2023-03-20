const createError = require('http-errors')
const User = require('../models/user/User.js')
const jwt = require('jsonwebtoken')


exports.verifytoken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return next(createError.Unauthorized("Please Login to access this page "))

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return next(createError.Forbidden("jwt expired"))
        let user = await User.findById(decoded.UserInfo.id)
        user ? req.user = decoded.UserInfo : next(createError.Unauthorized("User Not Found"))
        return next()
    })
}

exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(createError.Unauthorized(`Access denied: "${req.user.name}" is unauthorized User`)) // 403 forbidden
        }
        next()
    }
}

