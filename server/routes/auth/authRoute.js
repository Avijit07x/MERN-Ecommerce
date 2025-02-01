const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
	verifyOtp,
} = require("../../controllers/auth/authController");
const otpLimiter = require("../../helpers/OtpLimit");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-otp", otpLimiter, verifyOtp);
router.get("/check-auth", authMiddleware, (req, res) => {
	const user = req.user;
	return res
		.status(200)
		.json({ success: true, message: "Authenticated user", user });
});

module.exports = router;
