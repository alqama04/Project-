const errorHandler = (err, req, res, next) => {
    let status = err.status || 500 // server error 
    let message = err.message || 'Internal Server Error'

    // invalid json data
    if (err.type === 'entity.parse.failed') {
        status = 400
        message = "invalid Json data"
    }
    // invalid mongo id
    if (err.name === 'CastError') {
        message = `Resourse Not Found ${err.path} ${err.value}`
        status = 400
    }
    // duplicate data Error
    if (err.code === 11000) {
        status = 400
        message = `${Object.values(err.keyValue)} is already exist`
    }    
    
    console.log(err)
    res.status(status).json({ message: message, isError: true })
}


module.exports = errorHandler