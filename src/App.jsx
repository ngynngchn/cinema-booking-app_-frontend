import "./App.css";
import { BrowserRouter } from "react-router-dom";
// import MovieHall from "./pages/moviehall/MovieHall.jsx";
// import Home from "./pages/home/Home.jsx";
// import Admin from "./pages/admin/Admin.jsx";
// import MovieDetails from "./pages/moviedetails/MovieDetails.jsx";
// import ScreeningForm from "./components/screening-form/ScreeningForm.jsx";
// import AdminRoute from "./pages/auth/AdminRoute";
// import UserRoute from "./pages/auth/UserRoute";
// import AdminTest from "./pages/AdminTest";
import LocationProvider from "./pages/LocationProvider";
import AnimatedRoutes from "./pages/AnimatedRoutes";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<LocationProvider>
					<AnimatedRoutes />
				</LocationProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
