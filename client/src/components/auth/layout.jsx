import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<div className="flex h-svh w-full">
			<div className="hidden w-1/2 items-center justify-center bg-login-gradient px-12 lg:flex">
				<div className="max-w-md space-y-6 text-left text-primary-foreground">
					<h1 className="text-4xl font-extrabold leading-[1.5] tracking-tight">
						Welcome to ECommerce Shopping
					</h1>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-center bg-background px-4 py-12 max-lg:bg-login-gradient sm:px-6 lg:px-8">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
