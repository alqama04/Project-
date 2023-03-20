const express = require('express')
const userController = require('../../controllers/user/userController')
const authLimiter = require('../../middleware/authLimiter')
const router = express.Router()
const { authorizeRoles, verifytoken } = require('../../middleware/auth')



router.route('/register').post(authLimiter, userController.register)
router.route('/profile/:id')
    .get(verifytoken, userController.profile)
    .post(verifytoken, userController.updateProfile)

// admin router
router.route('/admin/users').get(verifytoken, authorizeRoles(['admin', 'manager', 'staff']), userController.getUsers)

// router.route('/admin/users/:id').get(verifytoken, userController.userDetail)

module.exports = router