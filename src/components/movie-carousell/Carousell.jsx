import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import MovieCard from "../movieCard/MovieCard";

import styled from "styled-components";

function Carousell({ items }) {
	const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
	// const items = ["🍔", "🍕", "🌭", "🍗"];
	// we want the scope to be always to be in the scope of the array so that the carousel is endless
	const indexInArrayScope =
		((activeIndex % items.length) + items.length) % items.length;

	// so that the carousel is endless, we need to repeat the items twice
	// then, we slice the the array so that we only have 3 items visible at the same time
	const visibleItems = [...items, ...items].slice(
		indexInArrayScope,
		indexInArrayScope + 3
	);
	const handleClick = (newDirection) => {
		setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
	};

	const handleSwipe = (event) => {
		const threshold = 100; // Minimum distance required for swipe
		const distX = event.changedTouches[0].clientX - event.touches[0].clientX;

		if (distX > threshold) {
			handleClick(-1); // Swipe left
		} else if (distX < -threshold) {
			handleClick(1); // Swipe right
		}
	};
	const handleScroll = (event) => {
		const threshold = 30; // Minimum distance required for scroll
		console.log(event.deltaX);
		const delta = Math.max(-1, Math.min(1, event.deltaX)); // Normalize scroll direction
		const newDirection = delta > 0 ? 1 : -1; // Set the direction based on scroll direction

		if (Math.abs(delta) > threshold) {
			handleClick(newDirection);
		}
		console.log(newDirection, delta);
	};

	useEffect(() => {
		const container = containerRef.current;
		container.addEventListener("wheel", handleScroll);

		return () => {
			container.removeEventListener("wheel", handleScroll);
		};
	}, []);

	const containerRef = useRef(null);

	return (
		<CarousellWindow>
			<Wrapper
				ref={containerRef}
				onTouchStart={handleSwipe}
				onTouchEnd={handleSwipe}>
				{/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
				<AnimatePresence mode="popLayout" initial={false}>
					{visibleItems.map((item) => {
						// The layout prop makes the elements change its position as soon as a new one is added
						// The key tells framer-motion that the elements changed its position
						return (
							<m.div
								className="card"
								key={item.id}
								layout
								custom={{
									direction,
									position: () => {
										if (item === visibleItems[0]) {
											return "left";
										} else if (item === visibleItems[1]) {
											return "center";
										} else {
											return "right";
										}
									},
								}}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.4 }}>
								<MovieCard data={item} />
							</m.div>
						);
					})}
				</AnimatePresence>
			</Wrapper>

			<Buttons>
				<m.button whileTap={{ scale: 0.8 }} onClick={() => handleClick(-1)}>
					◀︎
				</m.button>
				<m.button whileTap={{ scale: 0.8 }} onClick={() => handleClick(1)}>
					▶︎
				</m.button>
			</Buttons>
		</CarousellWindow>
	);
}

const variants = {
	enter: ({ direction }) => {
		return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
	},
	center: ({ position }) => {
		return {
			scale: position() === "center" ? 1 : 0.8,
			x: 0,
			zIndex: zIndex[position()],
			opacity: 1,
		};
	},
	exit: ({ direction }) => {
		return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
	},
};

const zIndex = {
	left: 1,
	center: 2,
	right: 1,
};

export default Carousell;

const CarousellWindow = styled.section`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	overflow: hidden;
`;

const Buttons = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
`;
