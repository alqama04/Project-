const rateLimit = require('express-rate-limit')

const time = 30 * 1000

const authLimiter = rateLimit({
	windowMs: time,
	max: 4,
	message: { message: `please wait for ${time/1000} seconds` },
	handler: (req, res, next, options) =>
		res.status(options.statusCode).json(options.message),

	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,

})

module.exports = authLimiter