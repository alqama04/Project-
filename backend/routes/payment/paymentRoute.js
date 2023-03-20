const express = require('express')
const router = express.Router()
const payment = require('../../controllers/payment/paymentController')

const { verifytoken } = require('../../middleware/auth')

router.use(verifytoken)

router.route('/').post(payment.checkout)