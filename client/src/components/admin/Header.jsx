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
						variant="destructive"
						className="inline-flex items-center justify-center gap-2 rounded-full px-3 text-xs font-medium shadow"
					>
						<LogOut className="size-4" />
						Logout
					</Button>
				</form>
			</div>
		</header>
	);
};

export default Header;
