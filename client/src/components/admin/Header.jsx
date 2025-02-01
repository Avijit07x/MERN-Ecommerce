import { logoutUser } from "@/store/authSlice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

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
				<Button
					variant="destructive"
					size="sm"
					className="gap-2 rounded-full text-sm"
					onClick={handleLogout}
				>
					<LogOut className="size-4" /> <span>Logout</span>
				</Button>
			</div>
		</header>
	);
};

export default Header;
