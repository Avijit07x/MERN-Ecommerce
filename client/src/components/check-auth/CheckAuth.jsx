import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const CheckAuth = ({ children }) => {
	const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
	const location = useLocation();

	if (location.pathname === "/") {
		if (!isAuthenticated) {
			return <Navigate to="/auth/login" />;
		}
		if (isAuthenticated) {
			if (currentUser?.role === "admin") {
				return <Navigate to="/admin/dashboard" />;
			}

			return <Navigate to="/shop/home" />;
		}
	}

	if (
		!isAuthenticated &&
		!(
			location.pathname.includes("/login") ||
			location.pathname.includes("/register")
		)
	) {
		return <Navigate to="/auth/login" />;
	}

	if (
		isAuthenticated &&
		(location.pathname.includes("/login") ||
			location.pathname.includes("/register"))
	) {
		if (currentUser?.role === "admin") {
			return <Navigate to="/admin/dashboard" />;
		} else {
			return <Navigate to="/shop/home" />;
		}
	}

	if (
		isAuthenticated &&
		currentUser?.role !== "admin" &&
		location.pathname.includes("admin")
	) {
		return <Navigate to="/unauth" />;
	}
	if (
		isAuthenticated &&
		currentUser?.role === "admin" &&
		location.pathname.includes("shop")
	) {
		return <Navigate to="/admin/dashboard" />;
	}

	return <>{children}</>;
};

export default CheckAuth;
