import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<div className="Home">
			<h2>Welcome to our Theater</h2>
			<Link to="/booking">Book your seat</Link>
			<Link to="/admin">Admin</Link>
		</div>
	);
}

export default Home;
