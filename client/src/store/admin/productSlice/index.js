import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isLoading: false,
	products: [],
};

// get products

export const getProducts = createAsyncThunk("/getProducts", async () => {
	try {
		const res = await axios.get(
			import.meta.env.VITE_SERVER_URL + "/admin/product/get-products",
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return res?.data;
	} catch (error) {
		return error.response.data;
	}
});

// add product

export const addProduct = createAsyncThunk(
	"/product/addProduct",
	async (data) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/admin/product/add-product",
				data,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			return res?.data;
		} catch (error) {
			return error.response.data;
		}
	},
);

// delete product

export const deleteProduct = createAsyncThunk(
	"/product/deleteProduct",
	async (productId) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL +
					`/admin/product/delete-product/${productId}`,
				{},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			return res?.data;
		} catch (error) {
			return error.response.data;
		}
	},
);

// update product
export const updateProduct = createAsyncThunk(
	"/product/updateProduct",
	async (formData) => {
		try {
			const res = await axios.put(
				import.meta.env.VITE_SERVER_URL + "/admin/product/update-product",
				{ formData },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			return res.data;
		} catch (error) {
			return error.response.data;
		}
	},
);

const productSlice = createSlice({
	name: "adminProducts",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload.products;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				console.log(action.payload);
			})

			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log({ action });
			})
			.addCase(addProduct.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
