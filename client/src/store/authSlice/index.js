import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	currentUser: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

const { setUser } = authSlice.actions;
export default authSlice.reducer;
