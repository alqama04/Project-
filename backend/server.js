const dotenv = require ('dotenv')
dotenv.config({path:"./config/.env"})
const app = require('./app')

const port = process.env.PORT || 8000

process.on("uncaughtException", (err) => {
    console.log('Error', err.message)
    console.log('shutting down the server due to uncaught Exception ')
    process.exit(1)
})

const server = app.listen(port, (err) => {
    console.log(`server started at port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log("Error message=>:", err)
    console.log('shutting down the server due to Unhadled promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})