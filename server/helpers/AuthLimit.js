const { rateLimit } = require("express-rate-limit");

const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20,
	message: {
		message: "Too many login requests. Please try again later.",
	},
});

const registerLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 10,
	message: { message: "Too many register requests. Please try again later." },
});

const otpLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5,
	message: { message: "Too many OTP requests. Please try again later." },
});

module.exports = { otpLimiter, loginLimiter, registerLimiter };
