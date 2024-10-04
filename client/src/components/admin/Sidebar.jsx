import {
	BadgeCheck,
	ChartNoAxesCombined,
	LayoutDashboard,
	ShoppingBasket,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		path: "/admin/dashboard",
		icon: <LayoutDashboard />,
	},
	{
		id: "products",
		label: "Products",
		path: "/admin/products",
		icon: <ShoppingBasket />,
	},
	{
		id: "orders",
		label: "Orders",
		path: "/admin/orders",
		icon: <BadgeCheck />,
	},
];

function MenuItems({ setOpen }) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<nav className="mt-8 flex flex-col gap-2">
			{adminSidebarMenuItems.map((menuItem) => (
				<div
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						setOpen ? setOpen(false) : null;
					}}
					className={` ${location.pathname === menuItem.path ? "bg-muted text-foreground" : "text-muted-foreground"} flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-muted hover:text-foreground`}
				>
					{menuItem.icon}
					<span className="text-sm font-medium">{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
}
const Sidebar = ({ open, setOpen }) => {
	const navigate = useNavigate();
	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-64">
					<div className="flex h-full flex-col">
						<SheetHeader className="border-b">
							<SheetTitle
								onClick={() => navigate("/admin/dashboard")}
								className="mb-5 mt-5 flex gap-2"
							>
								<ChartNoAxesCombined size={25} />
								<span className="text-xl font-bold">Admin Panel</span>
							</SheetTitle>
						</SheetHeader>
						<MenuItems setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className="hidden w-64 select-none flex-col border-r bg-background p-6 lg:flex">
				<div
					onClick={() => navigate("/admin/dashboard")}
					className="flex cursor-pointer items-center gap-2"
				>
					<ChartNoAxesCombined size={25} />
					<h1 className="text-xl font-bold">Admin Panel</h1>
				</div>
				<MenuItems />
			</aside>
		</>
	);
};

export default Sidebar;
