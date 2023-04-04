import React from "react";
import "./Confirmation.css";
import { Link } from "react-router-dom";

function Confirmation({ movie, time, data }) {
	return (
		<div className="Confirmation">
			<main>
				<h2>Thank you for booking!</h2>
				<p>Here are your ticket details:</p>
				<h5>Movie:</h5>
				<h6>{movie}</h6>
				<h5>Screening Time:</h5>
				<h6>{time}</h6>
				<h5>Your Seats:</h5>
				{data && data.map((seat) => <h6>Seat {seat.id}</h6>)}
				<h4>Enjoy your movie!</h4>
				<Link to="/"> OK! </Link>
			</main>
		</div>
	);
}

export default Confirmation;
