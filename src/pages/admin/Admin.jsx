import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
	//https://api.themoviedb.org/3/movie/now_playing?api_key=d603b23be9d778e54ec780db901ad054&language=en-US&page=1&region=DE
	// Get Movies that are playing at the moment and show as options
	const [freeSeats, setFreeSeats] = useState([]);
	const [totalSeats, setTotalSeats] = useState(0);
	const [sales, setSales] = useState(0);

	function handleSubmit(e) {
		const formData = new FormData(e.target);
		fetch("http://localhost:8888/api/seating", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	useEffect(() => {
		fetch("http://localhost:8888/api/reservations")
			.then((response) => response.json())
			.then((data) => getSales(data));
	}, []);

	function getSales(admin) {
		let total = 0;
		let freeSeats = 0;
		let totalSeats = 0;
		admin.flat().map((seat) => {
			if (seat.reserved) {
				totalSeats++;
				total += +seat.price;
			} else {
				totalSeats++;
				freeSeats++;
			}
		});
		setFreeSeats(freeSeats);
		setSales(total);
	}

	return (
		<div className="Admin">
			<nav>
				<h2>Dashboard</h2>
			</nav>
			<section>
				<h4></h4>
			</section>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Movie Title:</label>
				<input type="text" name="title" id="title" required />
				<label htmlFor="time">Movie Time:</label>
				<select name="time" id="time">
					<option value="6:30">06:30PM</option>
					<option value="7:30">07:30PM</option>
					<option value="8:30">08:30PM</option>
					<option value="9:30">09:30PM</option>
					<option value="10:30">10:30PM</option>
				</select>
				<label htmlFor="date">Movie Date:</label>
				<input type="date" name="date" id="date" required />
				<label htmlFor="regular">Regular Seats: </label>
				<input type="number" name="regular" id="regular" />
				<label htmlFor="regular">Premium Seats: </label>
				<input type="number" name="premium" id="premium" />
				<button>Create Hall</button>
			</form>

			<section>
				<article className="freeSeats">
					<h4>Available seats:</h4>
					<p>{freeSeats && freeSeats}</p>
				</article>
				<article className="sales">
					<h4>Total sales: </h4>
					<p> ${sales && sales}</p>
				</article>
			</section>
		</div>
	);
}

export default Admin;
