import React from "react";
import { useState, useEffect } from "react";
import Seat from "../components/Seat.jsx";
import { v4 as uuid4 } from "uuid";
import "./MovieHall.css";

// TODO: After booking the tickets, it should display something like : Thank you for booking the tickets! Enjoy your movie and redirect back to /home

function MovieHall() {
	const [seats, setSeats] = useState([]);
	const [selection, setSelected] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		fetch("http://localhost:8888/api/reservations")
			.then((response) => response.json())
			.then((data) => setSeats(data));
	}, []);

	// push selected Seats in to selection array
	const chooseSeat = (e) => {
		let id = e.target.value;
		// get the object with the elements id (.flat() flattens an array)
		let seat = seats.flat().find((seat) => +seat.id === +id);
		// if the elements reserves property is false and its not part of our selection yet we can add it to our selection
		if (!seat.reserved) {
			if (!selection.includes(seat)) {
				setSelected([...selection, seat]);
				setTotal(total + seat.price);
			} else {
				setSelected(selection.filter((s) => s !== seat));
				setTotal(total - seat.price);
			}
		}
	};

	const handleSubmit = () => {
		fetch("http://localhost:8888/api/newReservations", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(selection),
		})
			.then((response) => response.json())
			.then((data) => setSeats(data));
		setSelected([]);
		setTotal(0);
	};

	// console.log(seats);

	return (
		<div className="MovieHall">
			<main>
				<section className="movieDetails">
					<h3>John Wick 4</h3>
					<p>31.03.2023 8:45 PM </p>
				</section>
				<div className="screen"></div>
				<section className="seats">
					<article>
						{seats &&
							seats[0]?.map((seat) => (
								<Seat
									data={seat}
									key={uuid4()}
									onClick={chooseSeat}
									active={selection.includes(seat)}
								/>
							))}
					</article>
					<article>
						{seats &&
							seats[1]?.map((seat) => (
								<Seat
									data={seat}
									key={uuid4()}
									onClick={chooseSeat}
									active={selection.includes(seat)}
								/>
							))}
					</article>
					<section className="legend">
						<p>
							<span className="free"></span>available
						</p>
						<p>
							<span className="reserved"></span>reserved
						</p>
						<p>
							<span className="selected"></span>selected
						</p>
					</section>
				</section>
				<section className="selection">
					{selection?.map((selected) => (
						<article>
							<h5>{selected.type.toUpperCase()}</h5> <p> Seat {selected.id}</p>
							<p> ${selected.price}</p>
							<button
								value={selected.id}
								onClick={() => {
									setSelected(
										selection.filter((seat) => seat.id !== selected.id)
									);
									setTotal(0);
								}}>
								X
							</button>
						</article>
					))}

					<hr />
					<article>
						<h5>YOUR TOTAL</h5> <p>${total}</p>
					</article>
				</section>
				<button onClick={handleSubmit}>BOOK</button>
			</main>
		</div>
	);
}

export default MovieHall;
