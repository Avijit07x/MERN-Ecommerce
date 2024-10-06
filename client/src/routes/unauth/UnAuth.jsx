import { Link } from "react-router-dom";

const UnAuth = () => {
	return (
		<div className="flex h-svh w-full flex-col items-center justify-center uppercase tracking-wider lg:text-xl">
			<h1> you don't have access to this page</h1>

			<Link to="/" className="mt-5 underline">
				go back
			</Link>
		</div>
	);
};

export default UnAuth;
