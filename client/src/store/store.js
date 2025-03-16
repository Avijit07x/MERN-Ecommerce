import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import productReducer from "../store/admin/productSlice";
import authReducer from "./authSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ['auth'] 
};

const rootReducer = combineReducers({
	auth: authReducer,
	adminProduct: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export default store;
