const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// validation
		if (!(username && email && password)) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// check if user exists
		const checkUserName = await User.findOne({ username });
		if (checkUserName) {
			return res
				.status(409)
				.json({ success: false, message: "Username already exists" });
		}

		// check if user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = { username, email, password: hashedPassword };

		// save new user
		const newUser = new User(user);
		await newUser.save();

		res.status(200).json({ success: true, message: "User Registered" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// login controller
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!(email && password)) {
			return res.json({ success: false, message: "All fields are required" });
		}
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.json({ success: false, message: "User not exits" });
		}
		// Check password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.json({ success: false, message: "Incorrect password" });
		}

		const user = {
			id: existingUser._id,
			email: existingUser.email,
			role: existingUser.role,
			username: existingUser.username,
		};
		// create access token
		const accessToken = jwt.sign(
			{
				user,
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: process.env.TOKEN_KEY_EXPIRY,
			}
		);
		// crate refresh token
		const refreshToken = jwt.sign(
			{
				user,
			},
			process.env.REFRESH_TOKEN_KEY,
			{
				expiresIn: process.env.REFRESH_TOKEN_KEY_EXPIRY,
			}
		);

		// store refresh token
		existingUser.refreshToken = refreshToken;

		// save to db with token
		await existingUser.save();

		const options = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		};

		// Set cookie and return response
		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json({
				success: true,
				user,
				message: "Login successful",
			});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

// logout
const logoutUser = (req, res) => {
	res
		.clearCookie("accessToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			path: "/",
		})
		.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			path: "/",
		})
		.status(200)
		.json({ success: true, message: "User Logged Out" });
};

// Middleware
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
			return res.status(403).json({ success: false, message: "Token expired" });
		}
		return res.status(401).json({ success: false, message: "Unauthenticated" });
	}
};

// refresh token
const refreshTokenController = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res
			.status(401)
			.json({ success: false, message: "No refresh token" });
	}
	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

		if (!decoded) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid refresh token" });
		}
		const existingUser = await User.findById(decoded.user.id);

		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: "User not found" });
		}

		if (refreshToken !== existingUser.refreshToken) {
			return res
				.status(401)
				.json({ success: false, message: "Refresh token does not match" });
		}

		const user = {
			id: existingUser._id,
			email: existingUser.email,
			role: existingUser.role,
			username: existingUser.username,
		};

		// create access token
		const accessToken = jwt.sign(
			{
				user,
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: process.env.TOKEN_KEY_EXPIRY,
			}
		);
		// create refresh token
		const newRefreshToken = jwt.sign(
			{
				user,
			},
			process.env.REFRESH_TOKEN_KEY,
			{
				expiresIn: process.env.REFRESH_TOKEN_KEY_EXPIRY,
			}
		);
		const options = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		};
		// update refresh token
		existingUser.refreshToken = newRefreshToken;
		await existingUser.save();

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", newRefreshToken, options)
			.json({ success: true, message: "Token refreshed", user });
	} catch (error) {
		return res.status(401).json({ success: false, message: "Unauthenticated" });
	}
};
module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
	refreshTokenController,
};
