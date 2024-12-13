import { logoutUser } from "@/store/authSlice";
import { Menu, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
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
					<ShoppingBag className="h-6 w-6" />
					<span className="font-bold">Ecommerce</span>
				</Link>
				<Sheet aria-describedby={"sidebar"}>
					{isAuthenticated ? (
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden p-0 size-min">
								<Menu className="size-6" />
								<span className="sr-only">Toggle header menu</span>
							</Button>
						</SheetTrigger>
					) : (
						<></>
					)}
					<SheetContent side="right" className="w-full max-w-xs">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
							<SheetDescription></SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<div className="hidden lg:block"></div>

				<div className="hidden lg:block"></div>
			</div>
		</header>
	);
};

export default ShoppingHeader;
