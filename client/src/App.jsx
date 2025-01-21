import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import AdminLayout from "./components/admin/Layout";
import AuthLayout from "./components/auth/layout";
import CheckAuth from "./components/check-auth/CheckAuth";
import Loader from "./components/loader/Loader";
import ShoppingLayout from "./components/shopping/Layout";
import AdminDashboard from "./routes/admin/Dashboard";
import AdminFeatures from "./routes/admin/Features";
import AdminOrders from "./routes/admin/Orders";
import AdminProducts from "./routes/admin/Products";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import NotFound from "./routes/not-found/NotFound";
import ShoppingAccount from "./routes/shopping/Account";
import ShoppingCheckout from "./routes/shopping/Checkout";
import SHoppingHome from "./routes/shopping/Home";
import ShoppingListing from "./routes/shopping/Listing";
import UnAuth from "./routes/unauth/UnAuth";
import { checkAuth } from "./store/authSlice";

const App = () => {
	const { isAuthenticated, currentUser, isLoading } = useSelector(
		(state) => state.auth,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={currentUser} />
					}
				/>
				{/* auth routes */}

				<Route
					path="/auth"
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={currentUser}>
							<AuthLayout />
						</CheckAuth>
					}
				>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>

				{/* admin routes */}

				<Route
					path="/admin"
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={currentUser}>
							<AdminLayout />
						</CheckAuth>
					}
				>
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="features" element={<AdminFeatures />} />
					<Route path="orders" element={<AdminOrders />} />
					<Route path="products" element={<AdminProducts />} />
				</Route>

				{/* shopping routes */}

				<Route
					path="/shop"
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={currentUser}>
							<ShoppingLayout />
						</CheckAuth>
					}
				>
					<Route path="home" element={<SHoppingHome />} />
					<Route path="account" element={<ShoppingAccount />} />
					<Route path="checkout" element={<ShoppingCheckout />} />
					<Route path="listing" element={<ShoppingListing />} />
				</Route>

				{/* not found route */}

				<Route path="*" element={<NotFound />}></Route>

				{/* UnAuth */}

				<Route path="/unauth" element={<UnAuth />}></Route>
			</Routes>
		</div>
	);
};

export default App;
