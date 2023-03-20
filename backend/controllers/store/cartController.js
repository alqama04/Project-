


const Cart = require('../../models/store/Cart')
const createError = require('http-errors')
const ShippingInfo = require('../../models/user/ShippingInfo')

const addCart = async (req, res, next) => {
    const { prodId, quantity } = req.body
    if (!prodId) return next(createError.BadRequest('product Id is required '))
    const cartItems = {
        user: req.user.id,
        product: req.body.prodId,
        quantity
    }

    const cartDuplicate = await Cart.findOne({ user: req.user.id, product: cartItems.product })
    if (cartDuplicate) return next(createError.BadRequest('item already exist in cart'))



    let cart = await (await Cart.create(cartItems)).populate('product')
    if (cart) {
        cart.price = quantity * cart.product.discounted_price
        cart.save({ validateBeforeSave: false })
    }

    return res.status(201).json({
        success: true,
        message: 'item added to cart',

    });
}

const getCart = async (req, res, next) => {
    const cart = await Cart.find({ user: req.user.id })
        .populate("product",
            {
                name: 1,
                img: 1,
                mrp: 1,
                discount: 1,
                discounted_price: 1,
            }
        )

    let totalAmount = 0
    let amountPayable = 0
    let totalDiscount = 0

    let shippingCharge = 0

    cart.forEach(item => {
        totalAmount += item.quantity * item.product.mrp //2 * mrp = '10' == 20
        amountPayable += item.quantity * item.product.discounted_price  //2 * discounted_Price  == 18 ( 10% )
    })

    if (cart.length && amountPayable < 1000) {

        shippingCharge = 70
    }

    totalDiscount = totalAmount - amountPayable

    return res.status(201).json({
        success: true,
        cart,
        totalAmount, //cart total
        totalDiscount, // total discount
        shippingCharge,// delivery charge
        amountPayable,  //Amount payable
    });
}


const updateCart = async (req, res, next) => {
    console.log(req.body)
    const { id, quantity } = req.body
    if (quantity <= 0) return next(createError.BadRequest(`quantity must be greater than  ${quantity}`))
    if (quantity > 40) return next(createError.BadRequest(`item quantity shouldn't be more than 40`))

    const cartItem = await Cart.findOne({ _id: id, user: req.user.id }).populate("product", "-_id discounted_price")
    if (!cartItem) return next(createError.BadRequest('cart item does not exist'))

    cartItem.quantity = quantity
    cartItem.price = cartItem.product.discounted_price * cartItem.quantity

    cartItem.save({ validateBeforeSave: false })

    return res.status(200).json({
        success: true,
        message: 'cart item updated successfully'
    })

}


const deleteCartItem = async (req, res, next) => {
    const { id } = req.body
    const cartItem = await Cart.findOne({ _id: id, user: req.user.id })
    if (!cartItem) return next(createError.BadRequest('item does not exist'))

    cartItem.deleteOne()

    return res.status(200).json({
        success: true,
        message: 'cart item deleted'
    })

}


const deleteShippingInfo = async (req, res, next) => {
    const { id } = req.body
    const shippingInfo = await ShippingInfo.findOneAndDelete({ _id: id, user: req.user.id })

    if (!shippingInfo) return next(createError.BadRequest("shipping info doesn't exist "))

    return res.status(200).json({
        success: true,
        message: 'delivery info deleted successfully'
    })
}



module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteCartItem,
    deleteShippingInfo
}

