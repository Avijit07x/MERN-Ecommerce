import { Button } from "./components/ui/button";

const App = () => {
	return (
		<div>
			<Button
				onClick={() => {
					console.log("clicked");
				}}
				variant="default"
				size="sm"
			>
				Button
			</Button>
		</div>
	);
};

export default App;
