import Seat from "./Seat.jsx";
import { v4 as uuid4 } from "uuid";
import { useEffect, useState } from "react";

import styled from "styled-components";

function SeatingPlan({ seats, onclick, selection }) {
	const [selected, setSelected] = useState(selection);

	useEffect(() => {
		setSelected(selection);
	}, [selected]);

	return (
		<Hall>
			<Seats>
				{seats &&
					seats[0]?.map((seat) => (
						<Seat
							data={seat}
							key={uuid4()}
							onClick={onclick}
							active={selection.includes(seat)}
						/>
					))}
			</Seats>
			<Seats>
				{seats &&
					seats[1]?.map((seat) => (
						<Seat
							data={seat}
							key={uuid4()}
							onClick={onclick}
							active={selection.includes(seat)}
						/>
					))}
			</Seats>
			<Legend>
				<p>
					<Marker status="free" />
					available
				</p>
				<p>
					<Marker status="reserved" />
					reserved
				</p>
				<p>
					<Marker status="selected" />
					selected
				</p>
			</Legend>
		</Hall>
	);
}

export default SeatingPlan;

const Hall = styled.section`
	width: 340px;
	/* height: 300px; */
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-radius: 5px;
	padding: 10px;
	background-color: black;
`;

const Seats = styled.article`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.4rem;
	padding: 5px 0;
	border-radius: 3px;
	/* background-color: aquamarine; */
`;

const Legend = styled.section`
	display: flex;
	justify-content: center;
	width: 100%;
	gap: 1rem;
	color: white;

	p {
		display: flex;
		align-items: center;
		gap: 0.2rem;
	}
`;

const Marker = styled.span`
	display: inline-block;
	height: 13px;
	width: 13px;
	border-radius: 50%;
	background: ${({ status }) => {
		switch (status) {
			case "reserved":
				return "linear-gradient(145deg, #1d1d1d, #181818)";
			case "selected":
				return " linear-gradient(145deg, #e84849, #c33c3d)";
			case "free":
				return "linear-gradient(145deg, #f2f2f2, #e6e6e6)";
		}
	}};
`;
