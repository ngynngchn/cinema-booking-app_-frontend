import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import "./MovieHall.css";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import GoBack from "../../components/basic/GoBack.jsx";
import SeatingPlan from "../../components/SeatingPlan.jsx";

// TODO: After booking the tickets, it should display something like : Thank you for booking the tickets! Enjoy your movie and redirect back to /home

function MovieHall() {
	const [seats, setSeats] = useState([]);
	const [selection, setSelected] = useState([]);
	const [total, setTotal] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [details, setDetails] = useState();

	const url = import.meta.env.VITE_BACKEND;
	const apiKey = import.meta.env.VITE_API_KEY;
	const params = useParams();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
			.then((response) => response.json())
			.then((data) => setDetails(data))
			.catch((err) => console.log(err));

		fetch(url + "/api/reservations")
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

	if (!details) return;

	console.log(details);

	const handleSubmit = () => {
		if (selection.length > 0) {
			fetch(url + "/api/new-reservation", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(selection),
			})
				.then((response) => response.json())
				.then((data) => setSeats(data));

			fetch(url + "/api/email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(selection),
			})
				.then((response) => {
					console.log(response.status);
					setConfirm(true);
					setSelected([]);
					setTotal(0);
				})
				.catch((err) => console.log(err));
		} else {
			alert("Please choose a Seat!");
		}
	};
	if (!seats) return;

	return (
		<div className="MovieHall">
			{confirm && (
				<Confirmation
					data={selection}
					movie={details.original_title}
					time="31.03.2023 8:45 PM "
				/>
			)}
			<nav>
				<GoBack />
				<section className="movieDetails">
					<h3>{details.original_title}</h3>
					<p>31.03.2023 8:45 PM </p>
				</section>
			</nav>
			<main>
				<div className="screen"></div>
				<SeatingPlan seats={seats} onclick={chooseSeat} selection={selection} />
				<section className="selection">
					{selection?.map((selected) => (
						<article key={uuid4()}>
							<h5>{selected.type.toUpperCase()}</h5>
							<p> Seat {selected.id}</p>
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

				<button disabled={selection.length == 0} onClick={handleSubmit}>
					BOOK
				</button>
			</main>
		</div>
	);
}

export default MovieHall;
