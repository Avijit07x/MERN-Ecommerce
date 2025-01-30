import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";

const HeaderRight = ({ handleLogout }) => {
	const { currentUser } = useSelector((state) => state.auth);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-auto select-none p-0 hover:bg-transparent"
					>
						<Avatar>
							<AvatarFallback className="text-base font-bold">
								{currentUser?.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="max-w-64">
					<DropdownMenuLabel className="flex min-w-0 flex-col">
						<span className="truncate text-sm font-medium text-foreground">
							{currentUser?.username.toUpperCase()}
						</span>
						<span className="truncate text-xs font-normal text-muted-foreground">
							{currentUser?.email}
						</span>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
						<LogOut
							size={16}
							strokeWidth={2}
							className="opacity-60"
							aria-hidden="true"
						/>
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default HeaderRight;
