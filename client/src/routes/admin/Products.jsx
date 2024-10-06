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
						<SheetTitle>Add Product</SheetTitle>
					</SheetHeader>
					<ImageUpload />
					<AddProductForm />
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminProducts;
