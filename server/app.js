const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");

// DB Connection
connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;

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

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200).json("Server is up & running");
});

// // Routes
// app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
