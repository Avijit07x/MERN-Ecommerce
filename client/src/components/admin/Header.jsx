import { logoutUser } from "@/store/authSlice";
import { AlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";
import HeaderRight from "../shopping/HeaderRight";

const Header = ({ setOpen }) => {
	const dispatch = useDispatch();

	function handleLogout(e) {
		e.preventDefault();
		dispatch(logoutUser());
	}
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-4 py-3">
			<button
				onClick={() => setOpen(true)}
				className="bg-transparent sm:block lg:hidden"
			>
				<AlignJustify className="size-6 text-black" />
				<span className="sr-only">Toggle Menu</span>
			</button>

			<div className="flex flex-1 justify-end">
				<HeaderRight handleLogout={handleLogout} />
			</div>
		</header>
	);
};

export default Header;
