const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/ProductRoute");
const helmet = require("helmet");
const limiter = require("./helpers/RateLimit");
const compression = require("compression");
const cron = require("node-cron");
const { getProducts } = require("./controllers/admin/ProductController");

const app = express();
const PORT = process.env.PORT || 8000;

// Helmet Security
app.use(helmet());

// Cors
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(limiter);
app.use(compression());

// DB Connection
connectToDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/product", productRoute);

app.get("/", (req, res) => {
	res.status(200).json("Server is up & running");
});

// CRON JOB: Runs every night at 12 AM

cron.schedule("0 0 * * *", async () => {
	console.log("Cron job is running");
	await getProducts();
});

app.listen(PORT, () => {
	console.log("Server is running on port 8000");
});
