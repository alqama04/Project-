const  jwt = require('jsonwebtoken')
const sendToken = (user, statusCode, res) => {
    const accessToken = jwt.sign({ "UserInfo": { "id": user._id,"name":user.name,"role":user.role} }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12m' })
    const refreshToken = jwt.sign({ "id": user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10h' })
    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true, //enable in production
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
   return res.status(statusCode).json({ accessToken})
}
module.exports = sendToken