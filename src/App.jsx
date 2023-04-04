import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieHall from "./pages/moviehall/MovieHall.jsx";
import Home from "./pages/home/Home.jsx";
import Admin from "./pages/admin/Admin.jsx";
import MovieDetails from "./pages/moviedetails/MovieDetails.jsx";
import ScreeningForm from "./components/screening-form/ScreeningForm.jsx";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/test" element={<ScreeningForm />} />
					<Route path="/booking" element={<MovieHall />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
