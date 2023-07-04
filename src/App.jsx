import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./pages/AnimatedRoutes";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AnimatedRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
