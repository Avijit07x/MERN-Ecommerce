const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const authRoute = require("./routes/auth/authRoute");

const app = express();
const PORT = process.env.PORT || 8000;

// DB Connection
connectToDB();

// Cors
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"cache-control",
			"pragma",
		],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json("Server is up & running");
});

// Routes
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
