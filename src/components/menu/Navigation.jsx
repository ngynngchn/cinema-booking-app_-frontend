import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchField from "../basic/SearchField";
import SearchOutput from "../basic/SearchOutput";
import { useState } from "react";

function Navigation() {
	const [term, setTerm] = useState("");

	const listVariants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

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

	const handleChange = (e) => {
		setTerm(e.target.value);
	};

	return (
		<List variants={listVariants}>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Profile</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Previous Reservations</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Logout</Link>
			</Element>
			<SearchField onChange={handleChange} />
			<SearchOutput searchTerm={term} />
		</List>
	);
}

export default Navigation;

const List = styled(m.ul)`
	position: absolute;
	z-index: 9;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	padding: 5rem 2rem 2rem;
	max-height: 100%;
	overflow-y: scroll;
`;

const Element = styled(m.li)`
	list-style-type: none;
	text-align: left;
`;
