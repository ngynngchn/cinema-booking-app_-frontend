import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import MovieHall from "./pages/MovieHall.jsx";
import Home from "./pages/Home.jsx";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/booking" element={<MovieHall />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
