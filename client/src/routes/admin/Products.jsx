import AddProductForm from "@/components/admin/AddProductForm";
import ImageUpload from "@/components/admin/ImageUpload";
import ProductTile from "@/components/admin/ProductTile";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { deleteProduct, getProducts } from "@/store/admin/productSlice";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const AdminProducts = () => {
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");
	const [currentEditedId, setCurrentEditedId] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		brand: "",
		price: "",
		salePrice: "",
		totalStock: "",
	});
	const [searchedText, setSearchedText] = useState("");
	const [searchValue] = useDebounce(searchedText, 500);
	const { products, isLoading } = useSelector((state) => state.adminProduct);
	const [searchedProducts, setSearchedProducts] = useState([]);

	const dispatch = useDispatch();

	// get all products
	useEffect(() => {
		if (products.length === 0 && !isLoading) {
			dispatch(getProducts());
		}
	}, [dispatch, products]);

	// delete product
	const handleDelete = (productId) => {
		const result = confirm("Are you sure you want to delete this product?");
		if (result) {
			dispatch(deleteProduct(productId)).then((res) => {
				if (res.payload?.success) {
					dispatch(getProducts());

					toast.success(res.payload?.message);
				} else {
					toast.error(res.payload?.message);
				}
			});
		}
	};

	// search product
	const handleSearchProduct = (e) => {
		setSearchedText(e.target.value);
	};

	// search products
	useEffect(() => {
		if (searchedText === "") {
			setSearchedProducts(products);
		} else {
			const fetchSearchedProducts = async () => {
				try {
					const { data } = await axios.post(
						`${import.meta.env.VITE_SERVER_URL}/admin/product/search?search=${searchValue}`,
					);
					setSearchedProducts(
						data.products.length > 0 ? data?.products : products,
					);
				} catch (error) {
					setSearchedProducts(products);
				}
			};

			fetchSearchedProducts();
		}
	}, [searchValue, products]);

	// open create product dialog
	const handleOpenCreateProductsDialog = () => {
		setOpenCreateProductsDialog(true);
		setCurrentEditedId(null);
		if (currentEditedId !== null) {
			setFormData({
				title: "",
				description: "",
				category: "",
				brand: "",
				price: "",
				salePrice: "",
				totalStock: "",
			});
			setUploadedImageUrl("");
			setImageFile(null);
		}
	};

	return (
		<>
			<div className="mb-5 flex w-full justify-between gap-5">
				<div>
					<Input
						value={searchedText}
						type="text"
						name="search"
						id="search"
						placeholder="Search product by name"
						className="h-9 sm:w-72 lg:w-80 xl:w-96"
						onChange={handleSearchProduct}
					/>
				</div>
				<Button
					size="sm"
					className="rounded-full bg-blue-600 text-sm hover:bg-blue-600/90"
					onClick={handleOpenCreateProductsDialog}
				>
					Add Product
				</Button>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
					{searchedProducts.map((product) => (
						<ProductTile
							key={product?._id}
							product={product}
							setOpenCreateProductsDialog={setOpenCreateProductsDialog}
							handleDelete={handleDelete}
							setFormData={setFormData}
							setCurrentEditedId={setCurrentEditedId}
						/>
					))}
				</div>
			)}

			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={setOpenCreateProductsDialog}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle className="text-xl font-semibold">
							Add Product
						</SheetTitle>
					</SheetHeader>
					<ImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
					/>
					<AddProductForm
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setOpenCreateProductsDialog={setOpenCreateProductsDialog}
						formData={formData}
						setFormData={setFormData}
						currentEditedId={currentEditedId}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default memo(AdminProducts);
