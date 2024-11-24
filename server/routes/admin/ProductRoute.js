const express = require("express");
const { upload } = require("../../helpers/Cloudinary");
const {
	handleImageUpload,
	handleImageDelete,
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
} = require("../../controllers/admin/ProductController");

const router = express.Router();

router.post(
	"/upload-image",

	upload.single("image"),
	handleImageUpload
);
router.post("/delete-image", handleImageDelete);
router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.post("/delete-product/:id", deleteProduct);
router.put("/update-product", updateProduct);

module.exports = router;
