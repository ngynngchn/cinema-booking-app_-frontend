import { useState } from "react";
import styled from "styled-components";
import { useCycle, easeInOut, motion as m } from "framer-motion";
import { useEffect } from "react";

function SeatSelection({ total, children, selection, onClick, disabled }) {
	// const [isVisible, setIsClicked] = useState(false);
	const [isVisible, setIsClicked] = useCycle(false, true);

	const [selected, setSelected] = useState(selection);
	const variants = {
		open: {
			y: "0",
			opacWorkesition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: "100vh",
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	useEffect(() => {
		if (selection) {
			setSelected(selection.length);
		}
	}, [selection]);

	return (
		<Frame>
			<article onClick={() => setIsClicked()}>
				<h4>BOOK</h4>
				<p>{selected} Tickets</p> <h4>${total}</h4>
			</article>
			{/* {isVisible && selection.length > 0 && ( */}
			<Selected
				initial={false}
				key="modal"
				variants={variants}
				animate={isVisible ? "open" : "closed"}
				// variants={routeVariants}
				// initial="initial"
				// animate="final"
				// exit="final"
				transition={{ duration: 0.3, ease: easeInOut }}>
				<button onClick={() => setIsClicked()}>X</button>
				{children}
				<hr />
				<article>
					<p>Total:</p> <h4>${total}</h4>
				</article>
				<Button disabled={disabled} onClick={onClick}>
					Confirm Movie Reservation
				</Button>
			</Selected>
			{/* )} */}
		</Frame>
	);
}

export default SeatSelection;

const Frame = styled.section`
	border-radius: 3px;
	margin-top: 1rem;
	width: 100%;
	article {
		background-color: #292929;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 8px;
		/* width: fit-content; */
	}
`;

const Selected = styled(m.div)`
	position: absolute;
	height: 400px;
	inset: auto 0 0 0;
	background-color: #292929ea;
	backdrop-filter: blur(3px);
	border-radius: 20px 20px 0 0;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	/* justify-content: space-between; */
	button {
		align-self: flex-start;
	}
`;
const Button = styled.button`
	border-radius: 10px;
	background: linear-gradient(145deg, #e84849, #c33c3d);
	box-shadow: 0px 10px 100px 0px #c4504178;
	/* margin: 1rem; */
	width: 100%;
	justify-items: flex-end;
`;
