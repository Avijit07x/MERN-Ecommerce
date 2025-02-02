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

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
	try {
		const res = await axios.get(
			import.meta.env.VITE_SERVER_URL + "/auth/refresh-token",
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
		if (error.response.status === 403) {
			return error.response.status;
		}
		return error.response.data;
	}
});

export const verifyOtp = createAsyncThunk(
	"auth/verifyOtp",
	async (formData) => {
		try {
			const res = await axios.post(
				import.meta.env.VITE_SERVER_URL + "/auth/verify-otp",
				formData,
			);
			const result = res.data;
			return result;
		} catch (error) {
			return error.response.data;
		}
	},
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = false;
			})
			.addCase(registerUser.fulfilled, (state) => {
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
				state.isLoading = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload?.success
					? action.payload?.user
					: null;
				state.isAuthenticated = action.payload?.success;
			})
			.addCase(loginUser.rejected, (state) => {
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
			.addCase(checkAuth.rejected, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.currentUser = null;
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export default authSlice.reducer;
