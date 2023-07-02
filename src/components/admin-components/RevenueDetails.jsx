import { useState, useEffect } from "react";
import styled from "styled-components";

function RevenueDetails({ id }) {
	const [freeSeats, setFreeSeats] = useState([]);
	const [totalSeats, setTotalSeats] = useState(0);
	const [sales, setSales] = useState(0);
	const [details, setDetails] = useState();

	const url = import.meta.env.VITE_BACKEND;

	useEffect(() => {
		fetch(url + `/api/reservations/${id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				getSales(data.seats);
				setDetails(data.details);
			});
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

	if (!details) return;

	return (
		<Card>
			<h3>Movie</h3>
			<p>{details.title}</p>
			<article className="freeSeats">
				<h4>Available seats</h4>
				<p>{freeSeats && freeSeats}</p>
			</article>
			<article className="sales">
				<h4>Total revenue </h4>
				<p> ${sales && sales}</p>
			</article>
		</Card>
	);
}

export default RevenueDetails;

const Card = styled.section`
	background-color: #1d1d1d;
	width: fit-content;
	border-radius: 10px;
	padding: 0.5rem;
`;
