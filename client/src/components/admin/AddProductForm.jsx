import {
	addProduct,
	getProducts,
	updateProduct,
} from "@/store/admin/productSlice";
import { useDispatch } from "react-redux";
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

const AddProductForm = ({
	uploadedImageUrl,
	setImageFile,
	setOpenCreateProductsDialog,
	setFormData,
	formData,
	currentEditedId,
}) => {
	const dispatch = useDispatch();

	// Change handler
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Submit handler
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { image: { ...uploadedImageUrl }, ...formData };
		if (
			!data.image.url &&
			!data.title &&
			!data.description &&
			!data.category &&
			!data.brand &&
			!data.price &&
			!data.salePrice &&
			!data.totalStock
		) {
			toast.error("Please fill all the fields");
			return;
		}

		dispatch(addProduct(data)).then((res) => {
			if (res.payload?.success) {
				setFormData({
					title: "",
					description: "",
					category: "",
					brand: "",
					price: "",
					salePrice: "",
					totalStock: "",
				});
				dispatch(getProducts());
				setImageFile(null);
				setOpenCreateProductsDialog(false);
				toast.success(res.payload?.message);
			}
		});
	};

	// Update handler
	const handleUpdate = (e) => {
		e.preventDefault();
		const data = { updatedImage: { ...uploadedImageUrl }, ...formData };

		dispatch(updateProduct(data)).then((res) => {
			if (res.payload?.success) {
				dispatch(getProducts());
				setImageFile(null);
				setOpenCreateProductsDialog(false);
				toast.success(res.payload?.message);
			}
		});
	};

	return (
		<div className="mt-4">
			<form
				onSubmit={currentEditedId ? handleUpdate : handleSubmit}
				className="space-y-2"
			>
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
						value={formData.category}
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
						value={formData.brand}
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
						className="w-full [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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
						className="w-full [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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
						className="w-full [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
						value={formData.totalStock}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Button
						type="submit"
						className="mt-2 w-full bg-blue-600 hover:bg-blue-600/90"
					>
						{currentEditedId ? "Update Product" : "Add Product"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProductForm;
