const {
	ImageUploadUtil,
	ImageDeleteUtil,
} = require("../../helpers/Cloudinary");
const Product = require("../../models/Product");
const redis = require("../../helpers/redis");

// upload image to cloudinary
const handleImageUpload = async (req, res) => {
	try {
		const b64 = Buffer.from(req.file.buffer).toString("base64");
		const url = "data:" + req.file.mimetype + ";base64," + b64;

		const result = await ImageUploadUtil(url);

		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// delete image from cloudinary
const handleImageDelete = async (req, res) => {
	const { id } = req.body;
	try {
		const result = await ImageDeleteUtil(id);
		res.status(200).json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// add a new product
const addProduct = async (req, res) => {
	const data = req.body;
	if (!data) {
		return res
			.status(400)
			.json({ success: false, message: "All fields are required" });
	}
	try {
		const newProduct = new Product(data);
		await newProduct.save();
		const products = await Product.find({});
		await redis.set("products", JSON.stringify(products), "EX", 60 * 60 * 24);
		res.status(200).json({ success: true, message: "Product added" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// get all products
const getProducts = async (req, res) => {
	// try {
	// 	const productsFromDB = await Product.find({});
		
	// 	res.status(200).json({ success: true, products: productsFromDB });
	// } catch (error) {
	// 	res.status(500).json({ success: false, message: "Something went wrong" });
	// }
	redis.get("products", async (err, products) => {
		if (err) {
			return res.status(500).json({ success: false, message: "Redis error" });
		}

		// If products exist in cache, parse them and return
		if (products) {
			return res.status(200).json({
				success: true,
				products: JSON.parse(products),
				message: "Products fetched from cache",
			});
		}

		// If products not found in cache, fetch from database
		try {
			const productsFromDB = await Product.find({});
			await redis.set(
				"products",
				JSON.stringify(productsFromDB),
				"EX",
				60 * 60 * 24
			);
			res.status(200).json({ success: true, products: productsFromDB });
		} catch (error) {
			res.status(500).json({ success: false, message: "Something went wrong" });
		}
	});
};

// update product
const updateProduct = async (req, res) => {
	const {
		id,
		title,
		description,
		category,
		brand,
		price,
		salePrice,
		totalStock,
	} = req.body;
	try {
		const findProduct = await Product.findById(id);
		if (!findProduct) {
			return res
				.status(400)
				.json({ success: false, message: "Product not found" });
		}

		findProduct.title = title || findProduct.title;
		findProduct.description = description || findProduct.description;
		findProduct.category = category || findProduct.category;
		findProduct.brand = brand || findProduct.brand;
		findProduct.price = price || findProduct.price;
		findProduct.salePrice = salePrice || findProduct.salePrice;
		findProduct.totalStock = totalStock || findProduct.totalStock;

		await findProduct.save();

		res.status(200).json({ success: true, message: "Product updated" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

// delete product
const deleteProduct = async (req, res) => {
	const id = req.params.id;
	try {
		if (!id) {
			return res
				.status(400)
				.json({ success: false, message: "Product id is required" });
		}

		const findProduct = await Product.findById(id);

		if (!findProduct) {
			return res
				.status(400)
				.json({ success: false, message: "Product not found" });
		}

		// delete image from cloudinary
		await ImageDeleteUtil(findProduct.image.public_id);

		// delete product
		await Product.findByIdAndDelete(id);

		// delete specific product from cache
		await redis.del("products", id);

		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

module.exports = {
	handleImageUpload,
	handleImageDelete,
	addProduct,
	getProducts,
	updateProduct,
	deleteProduct,
};
