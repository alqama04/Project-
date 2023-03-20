const express = require('express')
require('express-async-errors')
const connectDb = require('./config/ConnectDb')
const errorHandler = require('./middleware/errorHandler')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const cors = require('cors')
const cloudnary = require('cloudinary') // media storage



const app = express()

// config
app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

cloudnary.v2.config({
   cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
   api_key: process.env.CLOUDNARY_API_KEY,
   api_secret: process.env.CLOUDNARY_API_SECRET
})

connectDb()

// Routes import
const userRoute = require('./routes/user/authRoute')
app.use('/auth', userRoute)
app.use('/users', require('./routes/user/userRoute'))

app.use('/items', require('./routes/store/adminStoreRoute'))

app.use('/store', require('./routes/store/StoreRoute'))
app.use('/order', require('./routes/store/orderRoute'))
app.use('/payment', require('./routes/store/orderRoute'))

app.all('*', (req, res, next) => {
   return next(createError.NotFound("this route does not exist"))
})

app.use(errorHandler)

module.exports = app