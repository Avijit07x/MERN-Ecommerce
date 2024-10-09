import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const AddProductForm = ({ uploadedImageUrl, setImageFile }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		brand: "",
		price: "",
		salePrice: "",
		totalStock: "",
	});

	// Change handler
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = { image: { ...uploadedImageUrl }, ...formData };
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/admin/product/add-product",
				data,
			);

			if (res.data.success) {
				toast.success("Product added");

				setFormData({
					title: "",
					description: "",
					category: "",
					brand: "",
					price: "",
					salePrice: "",
					totalStock: "",
				});

				setImageFile(null);
			}
		} catch (error) {
			console.log(error.response.data.message);
		}
	};

	return (
		<div className="mt-4">
			<form onSubmit={handleSubmit} className="space-y-2">
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						name="title"
						type="text"
						placeholder="Enter product title"
						className="w-full"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Enter product description"
						className="w-full"
						value={formData.description}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="category">Category</Label>
					<Select
						onValueChange={(value) =>
							setFormData((prevData) => ({ ...prevData, category: value }))
						}
					>
						<SelectTrigger id="category" className="w-full">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="men">Men</SelectItem>
								<SelectItem value="women">Women</SelectItem>
								<SelectItem value="kids">Kids</SelectItem>
								<SelectItem value="accessories">Accessories</SelectItem>
								<SelectItem value="footwear">Footwear</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="brand">Brand</Label>
					<Select
						onValueChange={(value) =>
							setFormData((prevData) => ({ ...prevData, brand: value }))
						}
					>
						<SelectTrigger id="brand" className="w-full">
							<SelectValue placeholder="Brand" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="nike">Nike</SelectItem>
								<SelectItem value="adidas">Adidas</SelectItem>
								<SelectItem value="puma">Puma</SelectItem>
								<SelectItem value="levi">Levi's</SelectItem>
								<SelectItem value="zara">Zara</SelectItem>
								<SelectItem value="h&m">H&M</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="price">Price</Label>
					<Input
						id="price"
						name="price"
						type="number"
						placeholder="Enter product price"
						className="w-full"
						min="0"
						value={formData.price}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="salePrice">Sale Price</Label>
					<Input
						id="salePrice"
						name="salePrice"
						type="number"
						min="0"
						placeholder="Enter Sale price (optional)"
						className="w-full"
						value={formData.salePrice}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="stock">Stock</Label>
					<Input
						id="stock"
						name="totalStock"
						type="number"
						min="0"
						placeholder="Enter Stock"
						className="w-full"
						value={formData.totalStock}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Button type="submit" className="mt-2 w-full">
						Add Product
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProductForm;