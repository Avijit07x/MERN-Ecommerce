const express = require("express");
// const { upload } = require("../../helpers/Cloudinary");
const {
	handleImageUpload,
	handleImageDelete,
	addProduct,
} = require("../../controllers/admin/ProductController");

const router = express.Router();

router.post("/upload-image", handleImageUpload);
router.post("/delete-image", handleImageDelete);
router.post("/add-product", addProduct);

module.exports = router;
