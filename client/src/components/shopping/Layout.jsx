import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
	return (
		<div className="flex flex-col overflow-hidden bg-white">
			{/* common header */}
			<ShoppingHeader />
			<main className="flex w-full flex-col">
				<Outlet />
			</main>
		</div>
	);
};

export default ShoppingLayout;
