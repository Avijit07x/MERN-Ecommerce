const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		image: {
			url: { type: String, required: true },
			public_id: { type: String, required: true },
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		salePrice: {
			type: Number,
		},
		totalStock: {
			type: Number,
			required: true,
		},
		averageReview: {
			type: Number,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.model.Product || mongoose.model("Product", ProductSchema);
