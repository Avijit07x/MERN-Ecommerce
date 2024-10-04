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

		// create token
		const token = jwt.sign(
			{
				user: {
					email: existingUser.email,
					role: existingUser.role,
					id: existingUser._id,
					username: existingUser.username,
				},
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);

		existingUser.token = token;

		// save to db with token
		await existingUser.save();

		const user = {
			id: existingUser._id,
			email: existingUser.email,
			role: existingUser.role,
		};

		const options = {
			httpOnly: true,
			secure: false,
		};

		// Set cookie and return response
		return res.status(200).cookie("token", token, options).json({
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
		.clearCookie("token", { httpOnly: true, path: "/" })
		.status(200)
		.json({ success: true, message: "User Logged Out" });
};

// Middleware
const authMiddleware = (req, res, next) => {
	const token = req.cookies.token;

	try {
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated" });
		}
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		if (!decoded) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthenticated" });
		}
		req.user = decoded.user;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: "Unauthenticated" });
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
};
