const express = require('express')
const cartController = require('../../controllers/store/cartController')
const router = express.Router()
const { verifytoken } = require('../../middleware/auth')

router.use(verifytoken)

router.route('/').post(cartController.addCart)
    .get(cartController.getCart)
    .put(cartController.updateCart)
    .delete(cartController.deleteCartItem)

router.route('/shipping-info')
    .delete(cartController.deleteShippingInfo)

module.exports = router
