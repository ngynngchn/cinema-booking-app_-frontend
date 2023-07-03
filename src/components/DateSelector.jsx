import { useState, useRef } from "react";
import { motion as m } from "framer-motion";
import styled from "styled-components";

import { createWeekday } from "../helper.js";
function DateSelector() {
	const startDate = new Date();
	const [selectedDate, setSelectedDate] = useState(createWeekday(startDate));

	const handleChange = (event) => {
		console.log(event.target.value);
		setSelectedDate(event.target.value);
	};

	const createLabel = () => {
		const dateLabels = [];

		for (let i = 0; i < 8; i++) {
			const currentDate = new Date(startDate);
			currentDate.setDate(startDate.getDate() + i);
			let date = createWeekday(currentDate);
			dateLabels.push(date);
		}
		console.log(selectedDate);
		return dateLabels.map((label, index) => (
			<>
				<DateLabel key={index}>
					<DateInput
						type="radio"
						name="date"
						value={label}
						checked={selectedDate == label}
						onChange={handleChange}
					/>
					<Label whileTap={{ scale: 0.97 }}>{label}</Label>
				</DateLabel>
			</>
		));
	};

	return <DateContainer>{createLabel()}</DateContainer>;
}

export default DateSelector;

const DateContainer = styled.section`
	width: 100%;
	display: flex;
	overflow-x: scroll;
	gap: 1rem;
	padding: 0.5rem 0;
`;

const DateLabel = styled.label`
	/* width: 4rem; */
	/* position: relative; */
`;

const Label = styled(m.p)`
	padding: 0.5rem;
	min-width: 3rem;
	height: 4rem;
	border-radius: 10px;
	position: relative;
	cursor: pointer;
	background: linear-gradient(145deg, #1d1d1d, #181818);

	&:hover {
		background-color: #161616;
	}
`;
const DateInput = styled.input`
	all: unset;
	&:checked + ${Label} {
		background: linear-gradient(145deg, #f2f2f2, #e6e6e6);
		box-shadow: 0 1px 10px 1px #f2f2f244;
		color: #222222;
	}
`;
