import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/admin/productSlice";
import authReducer from "./authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProduct: productReducer,
	},
});

export default store;
