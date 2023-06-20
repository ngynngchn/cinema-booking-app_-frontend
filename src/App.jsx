import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieHall from "./pages/moviehall/MovieHall.jsx";
import Home from "./pages/home/Home.jsx";
import Admin from "./pages/admin/Admin.jsx";
import MovieDetails from "./pages/moviedetails/MovieDetails.jsx";
import ScreeningForm from "./components/screening-form/ScreeningForm.jsx";
import AdminRoute from "./pages/auth/AdminRoute";
import UserRoute from "./pages/auth/UserRoute";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route element={<AdminRoute />}>
						<Route path="/admin" element={<Admin />} />
					</Route>
					{/* <Route element={<UserRoute />}> */}
					<Route path="/" element={<Home />} />
					<Route path="/test" element={<ScreeningForm />} />
					<Route path="/booking/:id" element={<MovieHall />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					{/* </Route> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
