import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ProductTile = ({
	product,
	setOpenCreateProductsDialog,
	setCurrentEditedId,
	setFormData,
	handleDelete,
}) => {
	return (
		<Card className="mx-auto w-full max-w-sm">
			<div>
				<div className="relative">
					<img
						src={product?.image.url}
						alt={product?.title}
						className="h-[300px] w-full rounded-t-lg object-cover"
					/>
				</div>
				<CardContent className="p-5">
					<h2 className="my-2 line-clamp-1 font-semibold">{product?.title}</h2>
					<div className="my-2 flex items-center justify-between">
						<span
							className={`${
								product?.salePrice > 0 ? "line-through" : ""
							} font-medium text-primary`}
						>
							${product?.price}
						</span>
						{product?.salePrice > 0 ? (
							<span className="font-medium">${product?.salePrice}</span>
						) : null}
					</div>
				</CardContent>
				<CardFooter className="flex items-center justify-between p-5 pt-0">
					<Button
						size="sm"
						onClick={() => {
							setOpenCreateProductsDialog(true);
							setCurrentEditedId(product?._id);
							setFormData(product);
						}}
					>
						Edit
					</Button>
					<Button size="sm" onClick={() => handleDelete(product?._id)}>
						Delete
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
};

export default ProductTile;
