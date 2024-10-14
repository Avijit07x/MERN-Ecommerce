import axios from "axios";
import { FileIcon, Loader2, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageUpload = ({
	setImageFile,
	imageFile,
	uploadedImageUrl,
	setUploadedImageUrl,
}) => {
	const inputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleImageUpload = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleDargOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			setImageFile(file);
		}
	};

	// upload image to cloudinary
	async function uploadImageToCloudinary() {
		setIsLoading(true);
		try {
			const data = new FormData();
			data.append("image", imageFile);
			const response = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/admin/product/upload-image",
				data,
			);
			if (response.data) {
				console.log("image uploaded successfully");
				setUploadedImageUrl({
					url: response.data.result.url,
					public_id: response.data.result.public_id,
				});
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error.response.data);
		}
	}

	// delete image from cloudinary
	async function deleteImageFromCloudinary() {
		try {
			const response = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/admin/product/delete-image",
				{ id: uploadedImageUrl.public_id },
			);
			if (response.data.success) {
				setImageFile(null);
				if (inputRef.current) {
					inputRef.current.value = "";
				}
				setUploadedImageUrl("");
				console.log("image deleted successfully");
			}
		} catch (error) {
			console.error(error.response.data);
		}
	}

	useEffect(() => {
		if (imageFile !== null && uploadedImageUrl === "")
			uploadImageToCloudinary();
	}, [imageFile]);

	return (
		<div className="mx-auto mt-4 w-full max-w-md">
			<Label className="my-4 block font-semibold">Upload Image</Label>
			<div
				className="rounded-md border-2 border-dashed"
				onDragOver={!imageFile ? handleDargOver : null}
				onDrop={!imageFile ? handleDrop : null}
			>
				<Input
					type="file"
					id="image-upload"
					className="hidden"
					onChange={handleImageUpload}
					accept="image/*"
					ref={inputRef}
				/>
				{!imageFile ? (
					<Label
						htmlFor="image-upload"
						className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md"
					>
						<UploadCloud className="size-10 text-muted-foreground" />
						<span className="text-muted-foreground">
							Drag & drop or click to upload
						</span>
					</Label>
				) : isLoading ? (
					<div className="flex items-center justify-center gap-1 p-4">
						<Loader2 className="size-6 animate-spin text-muted-foreground" />
					</div>
				) : (
					<div className="flex items-center justify-between gap-1 p-4">
						<div className="flex items-center gap-1">
							<div className="flex items-center">
								<FileIcon className="size-7 text-primary" />
							</div>
							<p className="text-sm font-medium line-clamp-1">{imageFile.name}</p>
						</div>

						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								className="p-0 hover:bg-transparent"
								onClick={deleteImageFromCloudinary}
							>
								<X className="size-5 text-red-500" />
								<span className="sr-only">Remove image</span>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
