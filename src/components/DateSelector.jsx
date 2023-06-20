import { useState, useRef } from "react";
import styled from "styled-components";

import { createWeekday } from "../helper.js";
function DateSelector() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const startDate = new Date();

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

		return dateLabels.map((label, index) => (
			<>
				<DateLabel key={index}>
					<DateInput
						type="radio"
						name="date"
						value={label}
						onChange={handleChange}
					/>
					<Label>{label}</Label>
				</DateLabel>
			</>
		));
	};

	return <DateContainer>{createLabel()}</DateContainer>;
}

export default DateSelector;

const DateContainer = styled.section`
	width: 100%;
	height: 5rem;
	display: flex;
	overflow-x: scroll;
	gap: 1rem;
	padding: 0.5rem;
`;

const DateLabel = styled.label`
	/* position: relative; */
`;

const Label = styled.p`
	padding: 0.5rem;
	border-radius: 4px;
	border: 1px solid grey;
	cursor: pointer;
	&:hover {
		background-color: grey;
	}
`;
const DateInput = styled.input`
	all: unset;
	&:checked + ${Label} {
		background-color: grey;
	}
`;
