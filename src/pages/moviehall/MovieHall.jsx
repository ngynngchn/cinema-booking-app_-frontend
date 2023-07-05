import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { motion as m } from "framer-motion";

import styled from "styled-components";
import Confirmation from "../../components/confirmation/Confirmation.jsx";
import GoBack from "../../components/basic/GoBack.jsx";
import Header from "../../components/basic/Header.jsx";
import SeatingPlan from "../../components/SeatingPlan.jsx";
import SeatSelection from "../../components/SeatSelection.jsx";
import Row from "../../components/Row";
import DateSelector from "../../components/DateSelector";
import TimeSelector from "../../components/TimeSelector";
import Menu from "../../components/menu/Menu.jsx";
// TODO: After booking the tickets, it should display something like : Thank you for booking the tickets! Enjoy your movie and redirect back to /home

function MovieHall() {
	const [seats, setSeats] = useState([]);
	const [selection, setSelected] = useState([]);
	const [total, setTotal] = useState(0);
	const [confirm, setConfirm] = useState(false);
	const [details, setDetails] = useState();

	const url = import.meta.env.VITE_BACKEND;
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(url + `/api/reservations/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setSeats(data.seats);
				setDetails(data.details);
			});
	}, []);

	const routeVariants = {
		initial: {
			y: "100vw",
		},
		final: {
			y: "0vw",
		},
	};

	// push selected seats in to selection array
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

	if (!details) {
		return;
	}

	const handleSubmit = () => {
		if (selection.length > 0) {
			fetch(url + `/api/new-reservation/${id}`, {
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
		<Hall
			variants={routeVariants}
			initial="initial"
			animate="final"
			exit="initial"
			transition={{ duration: 0.2 }}
			key={id}>
			{confirm && (
				<Confirmation
					data={selection}
					movie={details.title}
					time={`${details.date} ${details.time} PM `}
				/>
			)}
			<Header>
				<GoBack />
				<Title>{details.title}</Title>
				<Menu />
			</Header>

			<main>
				<Screen />

				<SeatingPlan seats={seats} onclick={chooseSeat} selection={selection} />

				<DateSelector />
				<TimeSelector />

				<SeatSelection
					total={total}
					selection={selection}
					onClick={handleSubmit}
					disabled={selection.length == 0}>
					{selection?.map((selected) => (
						<Row
							key={uuid4()}
							selected={selected}
							onclick={() => {
								setSelected(
									selection.filter((seat) => seat.id !== selected.id)
								);
								setTotal(0);
							}}
						/>
					))}
				</SeatSelection>
			</main>
		</Hall>
	);
}

export default MovieHall;

const Hall = styled(m.div)`
	position: relative;
	padding: 1rem;
	height: 100%;
	width: 100%;
	main:not(.Confirmation main) {
		/* height: 100%; */
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		align-items: center;
	}
	::before {
		content: " ";
		position: absolute;
		inset: 0 0;
		background-color: white;
		box-shadow: 0 0 150px 150px #ffffff5a;
		width: 1px;
		height: 1px;
		border-radius: 50%;
	}
`;

const Screen = styled.div`
	width: 360px;
	height: 100px;
	border: solid 5px #c33c3d;
	border-color: #c33c3d transparent transparent transparent;
	border-radius: 60%/100px 100px 0 0;
`;

const Title = styled.h3`
	width: 200px;
	font-size: 1rem;
	margin-inline: 0 auto;
`;
