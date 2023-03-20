const Category = require('../../models/store/Categories')
const Product = require('../../models/store/Product')
const createError = require('http-errors')
const getDataUri = require('../../utils/dataUri')
const cloudinary = require('cloudinary')

const addProduct = async (req, res, next) => {
  const { name, mrp, discount,
    discounted_price, stock,
    category, sub_category,
    description, bulletPoints,
    skin_type, net_weight,
    expiry_date,
    ingredients,
    utilize,
    keywords
  } = req.body

  const files = req.files
  let imageLinks = []

  const isValidData = [name, mrp,
    discount, discounted_price,
    category, description, stock,
    sub_category, skin_type,
    net_weight, expiry_date

  ].every(Boolean)
  if (!isValidData) return next(createError.BadRequest('all fields are required'))
  if (!files.length) return next(createError.BadRequest('image is required'))

  // check duplicate product
  const duplicate = await Product.findOne({ name: name, category: category, sub_category: sub_category })
  if (duplicate) return next(createError.Conflict('this item is already is exist'))

  const fileUri = getDataUri(files)
  let myCloudPromise = fileUri.map((picture) =>
    cloudinary.v2.uploader.upload(picture, { folder: "products" })
  );
  const myCloud = await Promise.all(myCloudPromise)

  for (let i in myCloud) {
    imageLinks.push({
      public_id: myCloud[i].public_id,
      url: req.protocol === 'http' ? myCloud[i].url : myCloud[i].secure_url
    })
  }

  const productData = {
    name: name.trim(),
    mrp,
    discount,
    discounted_price,
    category,
    sub_category,
    description,
    stock,
    ingredients,
    img: imageLinks,
    bulletPoints: bulletPoints.split('__'),
    skin_type,
    net_weight,
    expiry_date,
    utilize,
    keywords,
    user: req.user.id
  }


  const product = await Product.create(productData)
  return res.status(201).json({
    product,
    message: `${name} add sucessfully`
  })
}

const updateProduct = async (req, res, next) => {
  if (!req.params.id) return next(createError.BadRequest('Product Id is required'))

  const { name,
    mrp,
    discount,
    category,
    subCategory,
    skinType,
    avgRating,
    ingredients,
    weight,
    expiryDate,
    desc,
    stock,
    utilize,
    bulletPoints,
    sold,
    publicId,
    keywords

  } = req.body
  const isValidData = [name, mrp, discount, category, desc, stock,].every(Boolean)
  if (!isValidData) return next(createError.BadRequest('all fields are required'))

  const discountAmount = Math.round(req.body.mrp - (req.body.mrp * req.body.discount / 100), 0)
  const product = await Product.findById(req.params.id)
  if (!product) return next(createError.NotFound('item does not exist'))

  if (product.name !== name) {
    const duplicate = await Product.findOne({ name: name, category: category })
    if (duplicate) return next(createError.BadRequest('this product is already exist'))
  }
  const files = req.files
  let imageLinks = []
  let filterImage = []


  if (publicId) {
    filterImage = product.img.filter(img => !publicId.includes(img.public_id))
    let myCloudPromise = product.img.map(picture => publicId.includes(picture.public_id) ? cloudinary.v2.uploader.destroy(picture.public_id) : '')
    result = await Promise.all(myCloudPromise)
  }
  if (files.length) {
    const fileUri = getDataUri(files)
    let myCloudPromise = fileUri.map((picture) =>
      cloudinary.v2.uploader.upload(picture, { folder: 'products' }))

    const myCloud = await Promise.all(myCloudPromise)

    for (let i in myCloud) {
      imageLinks.push({
        public_id: myCloud[i].public_id,
        url: req.protocol === 'http' ? myCloud[i].url : myCloud[i].secure_url
      })
    }
  }

  const productData = {
    name: name.trim(),
    mrp: mrp,
    discount: discount,
    discounted_price: discountAmount,
    category: category,
    sub_category: subCategory,
    ingredients: ingredients,
    skin_type: skinType,
    net_weight: weight,
    expiry_date: expiryDate,
    description: desc,
    bulletPoints: bulletPoints,
    stock: stock,
    avgRating: avgRating,
    utilize: utilize,
    sold: sold,
    keywords,
    user: req.user.id
  }
  if (!filterImage.length && publicId) productData.img = []

  if (filterImage.length) productData.img = filterImage

  if (imageLinks.length) productData.img = [...imageLinks, ...product.img]

  if (imageLinks.length && filterImage.length) productData.img = [...imageLinks, ...filterImage]
  if (imageLinks.length && !filterImage.length) productData.img = [...imageLinks]


  await product.updateOne(productData)



  return res.status(200).json(
    {
      success: true,
      message: `${product.name} is updated successfully`
    })
}

// delete product @admin 
const deleteProduct = async (req, res, next) => {
  if (!req.params.id) return next(createError.BadRequest('Product id is required'))
  const product = await Product.findById(req.params.id)

  if (product.img.length) {
    let myCloudPromise = product.img.map((picture) =>
      cloudinary.v2.uploader.destroy(picture.public_id)
    );
    await Promise.all(myCloudPromise)
  }

  await product.deleteOne()


  return res.status(200).json({
    success: true,
    message: `${product.name} delete successfully`,
  })
}


module.exports = {
  addProduct,
  updateProduct,
  deleteProduct
}