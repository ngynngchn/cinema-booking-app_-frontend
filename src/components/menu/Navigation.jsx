import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Navigation() {
	const listVariants = {
		open: {
			zIndex: 2,
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	const variants = {
		open: {
			zIndex: 2,
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
		<List variants={listVariants}>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Hoooo</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Hoooo</Link>
			</Element>
			<Element
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}>
				<Link>Hoooo</Link>
			</Element>
		</List>
	);
}

export default Navigation;

const List = styled(m.ul)`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	top: 5rem;
	left: 3rem;
`;

const Element = styled(m.li)`
	list-style-type: none;
	text-align: left;
`;
