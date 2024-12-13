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
				<form onSubmit={handleLogout}>
					<Button
						size="sm"					
						className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium shadow"
					>
						<LogOut className="size-5" />
						Logout
					</Button>
				</form>
			</div>
		</header>
	);
};

export default Header;
