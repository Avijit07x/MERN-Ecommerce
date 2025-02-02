const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { default: sendOTPEmail } = require("../../helpers/Email");
const generateOTP = require("../../helpers/GenerateOTP");
const {
	generateAccessToken,
	generateRefreshToken,
	accessTokenOptions,
	refreshTokenOptions,
} = require("../../helpers/JwtGenerate");

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

		// check if user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// otp expires
		const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

		// generate otp
		const otp = generateOTP();

		const user = {
			username,
			email,
			password: hashedPassword,
			otp,
			otpExpires,
		};

		try {
			// Send OTP email
			await sendOTPEmail(email, otp);

			// save new user
			const newUser = new User(user);
			await newUser.save();

			res.status(200).json({ success: true, message: "OTP sent successfully" });
		} catch (error) {
			console.error("Error sending email:", error);
			res.status(500).json({ success: false, error: error.message });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// verify otp
const verifyOtp = async (req, res) => {
	const { email, otp } = req.body;
	if (!(email && otp)) {
		return res.json({
			success: false,
			message: "Something went wrong, please try again after some time",
		});
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: "User not found" });
		}
		if (user.isVerified) {
			return res.json({ success: false, message: "User already verified" });
		}
		if (otp.toString() !== user.otp.toString()) {
			return res.json({ success: false, message: "Invalid OTP" });
		}

		if (user.otpExpires < Date.now()) {
			return res.json({ success: false, message: "OTP expired" });
		}

		user.isVerified = true;
		user.otp = null;
		user.otpExpires = null;
		await user.save();
		res.status(200).json({ success: true, message: "User verified" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// login controller
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		return res.json({ success: false, message: "All fields are required" });
	}
	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.json({ success: false, message: "User not found" });
		}

		if (!existingUser.isVerified) {
			return res.json({ success: false, message: "User not verified" });
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
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(existingUser._id);

		// update refresh token
		existingUser.refreshToken = refreshToken;
		await existingUser.save();

		// Set cookie and return response
		return res
			.status(200)
			.cookie("accessToken", accessToken, accessTokenOptions)
			.cookie("refreshToken", refreshToken, refreshTokenOptions)
			.json({
				success: true,
				user,
				message: "Login successful",
			});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
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
		.status(200)
		.json({ success: true, message: "User Logged Out" });
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	verifyOtp,
};
