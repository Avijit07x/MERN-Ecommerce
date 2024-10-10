const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/ProductRoute");

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
			"x-requested-with",
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
app.use("/api/admin/product", productRoute);

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
