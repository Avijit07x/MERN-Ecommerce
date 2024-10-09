import AddProductForm from "@/components/admin/AddProductForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const AdminProducts = () => {
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");

	return (
		<>
			<div className="mb-5 flex w-full justify-end">
				<Button size="sm" onClick={() => setOpenCreateProductsDialog(true)}>
					Add Product
				</Button>
			</div>
			<div className="grid w-full gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
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
					<AddProductForm setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} />
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminProducts;
