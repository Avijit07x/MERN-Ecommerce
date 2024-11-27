const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
	refreshTokenController,
} = require("../../controllers/auth/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
	const user = req.user;
	return res
		.status(200)
		.json({ success: true, message: "Authenticated user", user });
});
router.get("/refresh-token", refreshTokenController);
module.exports = router;
