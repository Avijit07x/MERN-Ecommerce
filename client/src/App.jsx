import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;

