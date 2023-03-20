const express = require('express')
const authController = require('../../controllers/user/authController.js')
const { verifytoken } = require('../../middleware/auth.js')
const authLimiter = require('../../middleware/authLimiter.js')
const router = express.Router()

router.route('/authenticate').post(authLimiter, authController.authenticate)

router.route('/change-password').post(authLimiter, verifytoken, authController.changePassword)

router.route('/forgot-password').post(authController.forgotPassword)
router.route('/password/reset/:token').post(authController.resetPassword)
router.route('/verify/:token').post(authController.verifyOtp)

router.route('/refresh').get(authController.refresh)
router.route('/logout').post(authController.logout)


module.exports = router