import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import MovieHall from "./MovieHall.jsx";
import AdminTest from "./AdminTest";
import Home from "./Home.jsx";
import MovieDetails from "./MovieDetails.jsx";
import AdminRoute from "./auth/AdminRoute";
import UserRoute from "./auth/UserRoute";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";

function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.key}>
				<Route element={<AdminRoute />}>
					<Route path="/admin" element={<AdminTest />} />
				</Route>
				<Route element={<UserRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/booking/:id" element={<MovieHall />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
