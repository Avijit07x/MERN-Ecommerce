import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading } = useSelector((state) => state.auth);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const { username, email, password } = Object.fromEntries(formData);

		const urlencoded = new URLSearchParams();
		urlencoded.append("username", username);
		urlencoded.append("email", email);
		urlencoded.append("password", password);

		dispatch(registerUser(urlencoded)).then((data) => {
			if (data.payload?.success) {
				toast.success(data.payload?.message);
				navigate("/auth/login");
			} else {
				toast.error(data.payload?.message);
			}
		});
	};

	return (
		<div className="mx-auto w-full max-w-md space-y-6 text-white lg:text-black">
			<div className="text-center">
				<h1 className="text-3xl font-bold tracking-tight">
					Create new account
				</h1>
				<p className="mt-2">
					Already have an account
					<Link
						className="ml-2 font-medium underline hover:underline"
						to="/auth/login"
					>
						Login
					</Link>
				</p>
			</div>
			<form onSubmit={handleSubmit} className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="username">User Name</Label>
					<Input
						id="username"
						type="text"
						name="username"
						placeholder="Enter your user name"
						required
						className="rounded-full text-black"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="Enter your email"
						required
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
						required
						className="rounded-full text-black"
					/>
				</div>
				<Button
					disable={isLoading.toString()}
					className="w-full rounded-full bg-blue-500 duration-300 hover:bg-blue-500/90"
				>
					{isLoading ? "loading" : "Register"}
				</Button>
			</form>
		</div>
	);
};

export default Register;
