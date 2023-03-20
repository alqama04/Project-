const express = require('express')
const product = require('../../controllers/admin/adminProductControllers')
const category = require('../../controllers/admin/adminCategoryControllers')
const discountController = require('../../controllers/admin/adminDiscountController')
const { authorizeRoles, verifytoken } = require('../../middleware/auth')
const upload = require('../../middleware/multer')
const router = express.Router()

router.use(verifytoken, authorizeRoles(["admin", "mnanager"]))

router.route('/admin/category').post(upload, category.createCategory)
router.route('/admin/category/:id')
    .put(upload, category.updateCategory)
    .delete(category.deleteCategory)

router.route('/admin/subCategory')
    .post(category.addSubCategory)
    .delete(category.deleteSubCategory)

router.route('/admin/product').post(upload, product.addProduct)

router.route('/admin/product/:id')
    .put(upload, product.updateProduct)
    .delete(product.deleteProduct)

router.route('/admin/discount')
    .get(discountController.getDiscount)
    .post(discountController.createDiscount)
    .put(discountController.updateDiscount)
    .delete(discountController.deleteDiscount)

module.exports = router