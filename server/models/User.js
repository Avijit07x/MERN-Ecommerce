const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "user" },
	accessToken: { type: String, default: null },
	isVerified: { type: Boolean, default: false },
	otp: { type: Number, default: null },
	otpExpires: { type: Date, default: null, index: { expires: 0 } },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
