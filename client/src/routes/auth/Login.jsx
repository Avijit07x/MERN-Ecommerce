import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
	const { isLoading } = useSelector((state) => state.auth);
	// const { toast } = useToast();
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
				// toasts({ title: data.payload?.message });
				toast.success(data.payload?.message);
			}

			if (!data.payload?.success) {
				toast.error(data.payload?.message);
			}
		});
	};
	return (
		<div className="mx-auto w-full max-w-md space-y-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					Sign in to your account
				</h1>
				<p className="mt-2">
					Don't have an account
					<Link
						className="ml-2 font-medium text-primary hover:underline"
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
					/>
				</div>
				<Button
					type="submit"
					disable={isLoading.toString()}
					className="w-full bg-blue-500 duration-300 hover:bg-blue-500/90"
				>
					Sign in
				</Button>
			</form>
		</div>
	);
};

export default Login;
