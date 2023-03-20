const express = require('express')
const category = require('../../controllers/store/categoryController')
const prodController = require('../../controllers/store/productController')
const router = express.Router()
const { verifytoken } = require('../../middleware/auth')


router.route('/category').get(category.getCategory)
router.route('/products/').get(prodController.getProduct)

router.route('/review')
.get(prodController.getReview)
router.route('/review')
.post(verifytoken, prodController.addReview)
.delete(verifytoken,prodController.deleteReview)

router.route('/product/:id').get(prodController.singleProduct)

module.exports = router

