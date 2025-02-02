import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/authSlice";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.email === "" || formData.password === "") {
			toast.error("Please fill all the fields");
			return;
		}

		setIsSubmitting(true);
		dispatch(loginUser(formData)).then((data) => {
			if (data.payload?.success) {
				setIsSubmitting(false);
				navigate("/");
				toast.success(data.payload?.message);
			}
			if (!data.payload?.success) {
				setIsSubmitting(false);
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
						onChange={handleChange}
						value={formData?.email}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<div className="relative w-full">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Enter your password"
							autoComplete="current-password"
							className="rounded-full text-black pr-11"
							onChange={handleChange}
							value={formData?.password}
						/>
						<Button
							type="button"
							className="absolute right-2 top-0 text-gray-500 text-opacity-60 hover:bg-transparent hover:text-gray-500 hover:text-opacity-60"
							variant="ghost"
							onClick={() => setShowPassword(!showPassword)}
							size="icon"
						>
							{showPassword ? (
								<Eye className="size-4" />
							) : (
								<EyeOff className="size-4" />
							)}
						</Button>
					</div>
				</div>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full rounded-full bg-blue-500 duration-300 hover:bg-blue-500/90"
				>
					{isSubmitting ? (
						<div className="flex items-center gap-2">
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
