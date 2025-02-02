const jwt = require("jsonwebtoken");

// Function to generate access token
const generateAccessToken = (user) => {
	return jwt.sign({ user }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_KEY_EXPIRY });
};

// Function to generate refresh token
const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, {
		expiresIn: process.env.REFRESH_TOKEN_KEY_EXPIRY,
	});
};

const accessTokenOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

const refreshTokenOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	accessTokenOptions,
	refreshTokenOptions,
};
