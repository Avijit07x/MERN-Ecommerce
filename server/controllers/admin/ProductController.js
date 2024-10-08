const {
	ImageUploadUtil,
	ImageDeleteUtil,
} = require("../../helpers/Cloudinary");

const Product = require("../../models/Product");

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
	try {
		const newProduct = new Product(data);
		await newProduct.save();
		res.status(200).json({ success: true, message: "Product added" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};

module.exports = {
	handleImageUpload,
	handleImageDelete,
	addProduct,
};
