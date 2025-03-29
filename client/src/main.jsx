import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<Toaster richColors closeButton />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
