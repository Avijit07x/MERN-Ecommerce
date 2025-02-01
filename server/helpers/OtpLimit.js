const { rateLimit } = require("express-rate-limit");

const otpLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5,
	message: { error: "Too many OTP requests. Please try again later." },
});

module.exports = otpLimiter;
