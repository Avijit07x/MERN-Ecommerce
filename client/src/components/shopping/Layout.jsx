import { Outlet } from "react-router";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
	return (
		<div className="flex flex-col overflow-hidden bg-white">
			{/* common header */}
			<ShoppingHeader />
			<main className="flex w-full flex-col px-4 md:px-6">
				<Outlet />
			</main>
		</div>
	);
};

export default ShoppingLayout;
