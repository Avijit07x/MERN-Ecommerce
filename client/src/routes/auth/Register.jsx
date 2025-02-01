import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/store/authSlice";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showOtpForm, setShowOtpForm] = useState(false);
	const [registeredEmail, setRegisteredEmail] = useState("");
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
				toast.success("Registration successful! Please verify OTP");
				setRegisteredEmail(email);
				setShowOtpForm(true);
			} else {
				toast.error(data.payload?.message);
			}
		});
	};

	const handleOtpSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const { otp } = Object.fromEntries(formData);

		const urlencoded = new URLSearchParams();
		urlencoded.append("email", registeredEmail);
		urlencoded.append("otp", otp);

		dispatch(verifyOtp(urlencoded)).then((data) => {
			if (data.payload?.success) {
				toast.success(data.payload?.message);
				navigate("/auth/login");
			} else {
				toast.error(data.payload?.message);
			}
		});
	};

	return (
		<div className="relative mx-auto h-96 w-full max-w-md overflow-hidden">
			<div
				className={`absolute left-0 top-0 w-full px-2 transition-transform duration-500 ${
					showOtpForm ? "-translate-x-full" : "translate-x-0"
				}`}
			>
				<div className="space-y-6 text-white lg:text-black">
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
							{isLoading ? (
								<div className="flex items-center gap-2">
									{" "}
									<Loader className="size-4 animate-spin" />{" "}
									<span>Registering</span>
								</div>
							) : (
								"Register"
							)}
						</Button>
					</form>
				</div>
			</div>

			<div
				className={`absolute left-0 top-0 w-full px-2 transition-transform duration-500 ${
					showOtpForm ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="space-y-6 text-white lg:text-black">
					<div className="text-center">
						<h1 className="text-3xl font-bold tracking-tight">Verify OTP</h1>
						<p className="mt-2">
							We've sent a verification code to <br /> {registeredEmail}
						</p>
					</div>
					<form onSubmit={handleOtpSubmit} className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="otp">Verification Code</Label>
							<Input
								id="otp"
								type="text"
								name="otp"
								placeholder="Enter 6-digit OTP"
								required
								className="rounded-full text-black"
								maxLength="6"
							/>
						</div>
						<Button
							disabled={isLoading}
							className="w-full rounded-full bg-blue-500 duration-300 hover:bg-blue-500/90"
						>
							{isLoading ? "Verifying..." : "Verify OTP"}
						</Button>
						<Button
							type="button"
							variant="outline"
							disabled={isLoading.toString()}
							className="w-full rounded-full text-black"
							onClick={() => setShowOtpForm(false)}
						>
							Back to Registration
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
