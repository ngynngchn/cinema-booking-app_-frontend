import { useState } from "react";
import { motion as m } from "framer-motion";
import styled from "styled-components";

function TimeSelector() {
	const times = ["6:30", "7:30", "8:30", "9:30", "10:30"];
	const [selectedTime, setTime] = useState(times[0]);
	const handleChange = (event) => {
		console.log(event.target.value);
		setTime(event.target.value);
	};

	return (
		<TimeContainer>
			{times.map((time, index) => (
				<TimeLabel key={index}>
					<TimeInput
						type="radio"
						name="time"
						value={time}
						checked={selectedTime == time}
						onChange={handleChange}
					/>
					<Label whileTap={{ scale: 0.97 }}>{time.padStart(5, 0)} PM</Label>
				</TimeLabel>
			))}
		</TimeContainer>
	);
}

export default TimeSelector;

const TimeContainer = styled.section`
	display: flex;
	gap: 0.5rem;
	overflow-x: scroll;
	width: 100%;
	height: 3rem;
`;
const TimeLabel = styled.label`
	/* width: 3rem; */
	/* position: relative; */
`;

const Label = styled(m.p)`
	white-space: nowrap;
	padding: 0.3rem 0.7rem;
	height: fit-content;
	border-radius: 10px;
	position: relative;
	cursor: pointer;
	background: linear-gradient(145deg, #1d1d1d, #181818);
	font-size: 0.7rem;
	&:hover {
		background-color: #161616;
	}
`;
const TimeInput = styled.input`
	all: unset;
	&:checked + ${Label} {
		background: linear-gradient(145deg, #f2f2f2, #e6e6e6);
		box-shadow: 0 1px 10px 1px #f2f2f244;

		color: #222222;
	}
`;
