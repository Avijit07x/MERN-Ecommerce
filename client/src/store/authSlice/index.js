import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	currentUser: null,
};

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (formData) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/auth/register",
				formData,
				{
					withCredentials: true,
				},
			);

			const result = res.data;

			return result;
		} catch (error) {
			return error.response.data;
		}
	},
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (formData) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/auth/login",
				formData,
				{
					withCredentials: true,
					
				},
			);

			const result = res.data;

			return result;
		} catch (error) {
			return error.response.data;
		}
	},
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
	try {
		const res = await axios.post(
			import.meta.env.VITE_SERVER_URL + "/auth/logout",
			{},
			{
				withCredentials: true,
			},
		);
		const result = res.data;
		return result;
	} catch (error) {
		return error.response.data;
	}
});

export const checkAuth = createAsyncThunk("auth/checkauth", async () => {
	try {
		const res = await axios.get(
			import.meta.env.VITE_SERVER_URL + "/auth/check-auth",

			{
				withCredentials: true,
				headers: {
					"Cache-Control":
						"no-cache , no-store, must-revalidate, proxy-revalidate",
				},
			},
		);

		const result = res.data;
		return result;
	} catch (error) {
		return error.response.data;
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = null;
				state.isAuthenticated = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				console.log(action.payload);
				state.isLoading = false;
				state.currentUser = null;
				state.isAuthenticated = false;
			})

			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload?.success
					? action.payload?.user
					: null;
				state.isAuthenticated = action.payload?.success;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.currentUser = null;
			})
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload?.success
					? action.payload?.user
					: null;
				state.isAuthenticated = action.payload?.success;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.currentUser = null;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
