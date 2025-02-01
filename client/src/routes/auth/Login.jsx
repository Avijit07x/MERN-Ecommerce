import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/authSlice";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
	const { isLoading } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const { email, password } = Object.fromEntries(formData);

		if (!(email && password)) {
			return;
		}

		const urlencodedData = new URLSearchParams();
		urlencodedData.append("email", email);
		urlencodedData.append("password", password);

		if (!urlencodedData) {
			return;
		}
		dispatch(loginUser(urlencodedData)).then((data) => {
			if (data.payload?.success) {
				navigate("/");

				toast.success(data.payload?.message);
			}

			if (!data.payload?.success) {
				toast.error(data.payload?.message);
			}
		});
	};
	return (
		<div className="mx-auto w-full max-w-md space-y-6 text-white lg:text-black">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight">
					Sign in to your account
				</h1>
				<p className="mt-2">
					Don't have an account
					<Link
						className="ml-2 font-medium underline hover:underline"
						to="/auth/register"
					>
						Register
					</Link>
				</p>
			</div>
			<form onSubmit={handleSubmit} className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="Enter your email"
						autoComplete="email"
						className="rounded-full text-black"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="Enter your password"
						autoComplete="current-password"
						className="rounded-full text-black"
					/>
				</div>
				<Button
					type="submit"
					disable={isLoading.toString()}
					className="w-full rounded-full bg-blue-500 duration-300 hover:bg-blue-500/90 disabled:cursor-not-allowed disabled:bg-gray-400"
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							{" "}
							<Loader className="size-4 animate-spin" /> <span>Signing in</span>
						</div>
					) : (
						"Sign in"
					)}
				</Button>
			</form>
		</div>
	);
};

export default Login;
