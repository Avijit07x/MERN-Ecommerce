const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: {
		status: 429,
		message: "Too many requests from this IP, please try again later.",
	},
});

module.exports = limiter;
