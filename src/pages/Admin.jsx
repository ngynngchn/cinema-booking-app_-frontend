import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
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
		console.log(totalSeats);
		setFreeSeats(freeSeats);
		setSales(total);
	}

	return (
		<div className="Admin">
			<form onSubmit={handleSubmit}>
				<label htmlFor="regular">How many regular seats do you need? </label>
				<input type="number" name="regular" id="regular" />
				<label htmlFor="regular">How many premium seats do you need? </label>
				<input type="number" name="premium" id="premium" />
				<button>Create Hall</button>
			</form>

			<section>
				<article>
					<h2>Available Seats: {freeSeats && freeSeats}</h2>
				</article>
				<article>
					<h2>Sales: ${sales && sales}</h2>
				</article>
			</section>
		</div>
	);
}

export default Admin;
