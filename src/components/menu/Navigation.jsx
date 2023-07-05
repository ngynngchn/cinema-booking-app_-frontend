import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import SearchField from "../basic/SearchField";
import SearchOutput from "../basic/SearchOutput";

function Navigation() {
	const [term, setTerm] = useState("");

	const url = import.meta.env.VITE_BACKEND;

	const navigate = useNavigate();

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

	const logout = async () => {
		try {
			const result = await fetch(url + "/api/logout", {
				method: "POST",
				credentials: "include",
			});
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<List variants={listVariants}>
			<Element
				variants={variants}
				whileHover={{ scale: 0.98 }}
				whileTap={{ scale: 0.96 }}>
				<Link>Profile</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 0.98 }}
				whileTap={{ scale: 0.96 }}>
				<Link>Previous Reservations</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 0.98 }}
				whileTap={{ scale: 0.96 }}>
				<Link>Bookmarked Movies</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 0.98 }}
				whileTap={{ scale: 0.96 }}>
				<button onClick={logout}>Log out</button>
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
	a {
		background: none;
	}
`;
