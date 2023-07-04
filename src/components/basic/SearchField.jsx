import styled from "styled-components";
import { Search } from "@styled-icons/evaicons-solid/Search";
import { motion as m } from "framer-motion";

function SearchField({ onChange }) {
	const variants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	return (
		<Label htmlFor="search" variants={variants}>
			<Icon />
			<Input
				autoComplete="off"
				type="search"
				name="search"
				id="search"
				onChange={onChange}
			/>
		</Label>
	);
}

export default SearchField;

const Input = styled.input`
	text-align: left;
	border: none;
	padding: 0.5rem 0.3rem;
	padding-left: 30px;
	width: 10%;
	background-color: transparent;
	transition: width 0.3s ease-in-out;
	font-size: 1rem;

	:focus-visible {
		outline: none;
		width: 100%;
		border-bottom: 2px solid #e84849;
	}
`;

const Icon = styled(Search)`
	width: 25px;
	height: 25px;
	margin: 1px 3px;
	position: absolute;
	left: 0;
`;

const Label = styled(m.label)`
	position: relative;
	display: flex;
	::after {
		content: "";
		position: absolute;
		width: 100%;
		/* height: 1px; */
		bottom: 0;
		left: 0;
		z-index: -1;
		/* background-color: blue; */
		border-bottom: 2px solid white;
	}
`;
