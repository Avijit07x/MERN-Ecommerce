import { shoppingViewHeaderMenuItems } from "@/config/config";
import { logoutUser } from "@/store/authSlice";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

const MenuItems = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<nav className="mb-3 flex flex-col gap-6 lg:mb-0 lg:flex-row lg:items-center">
			{shoppingViewHeaderMenuItems.map((menuItem) => (
				<Label
					onClick={() => handleNavigate(menuItem)}
					className="cursor-pointer text-sm font-medium"
					key={menuItem.id}
				>
					{menuItem.label}
				</Label>
			))}
		</nav>
	);
};

const ShoppingHeader = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	function handleLogout(e) {
		e.preventDefault();
		dispatch(logoutUser());
	}
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<Link to="/shop/home" className="flex items-center gap-2">
					<img className="size-8" src="/shopping-cart.png" alt="logo" />
					<span className="font-bold">ECommerce</span>
				</Link>
				<Sheet aria-describedby={"sidebar"}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="size-min p-0 lg:hidden"
						>
							<Menu className="size-6" />
							<span className="sr-only">Toggle header menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-full max-w-xs">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
							<MenuItems />
							<Button onClick={handleLogout}>Logout</Button>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<div className="hidden lg:block">
					<MenuItems />
				</div>
			</div>
		</header>
	);
};

export default ShoppingHeader;
