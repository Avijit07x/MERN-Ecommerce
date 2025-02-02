const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
	generateAccessToken,
	generateRefreshToken,
	accessTokenOptions,
	refreshTokenOptions,
} = require("../helpers/JwtGenerate");

const authMiddleware = async (req, res, next) => {
	const token = req.cookies.accessToken;
	const refreshToken = req.cookies.refreshToken;
	
	if (!token && !refreshToken) {
		return res
			.status(401)
			.json({ success: false, message: "Unauthenticated: No token" });
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		if (!decoded) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Invalid token" });
		}

		const user = await User.findById(decoded.user.id);

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Invalid user" });
		}

		req.user = decoded.user;

		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			if (!refreshToken) {
				return res
					.status(403)
					.json({ success: false, message: "Refresh token not found" });
			}

			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

			if (!decoded) {
				return res
					.status(403)
					.json({ success: false, message: "Invalid refresh token" });
			}

			const user = await User.findById(decoded.userId);

			if (!user) {
				return res
					.status(403)
					.json({ success: false, message: "User not found" });
			}

			if (user.refreshToken !== refreshToken) {
				return res
					.status(403)
					.json({ success: false, message: "Invalid refresh token" });
			}

			const newUser = {
				id: user._id,
				email: user.email,
				role: user.role,
				username: user.username,
			};
			// Generate new access token
			const newAccessToken = generateAccessToken(newUser);

			// Generate new refresh token
			const newRefreshToken = generateRefreshToken(user._id);

			// Update user's refresh token
			user.refreshToken = newRefreshToken;
			await user.save();

			// Set new access token and refresh token in cookies
			res.cookie("accessToken", newAccessToken, accessTokenOptions);
			res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

			return res
				.status(200)
				.json({ success: true, user: newUser, message: "Token refreshed" });
		}
		return res.status(401).json({ success: false, message: "Unauthenticated" });
	}
};

module.exports = authMiddleware;
