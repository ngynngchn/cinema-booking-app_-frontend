import { useCycle, motion as m } from "framer-motion";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";

function Menu() {
	const useDimensions = (ref) => {
		const dimensions = useRef({ width: 0, height: 0 });

		useEffect(() => {
			dimensions.current.width = ref.current.offsetWidth;
			dimensions.current.height = ref.current.offsetHeight;
		}, []);

		return dimensions.current;
	};

	const [isOpen, setOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	const sidebar = {
		open: (height = 1000) => ({
			clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
			zIndex: 1,
			transition: {
				type: "spring",
				stiffness: 20,
				restDelta: 2,
			},
		}),
		closed: {
			clipPath: "circle(26px at 260px 40px)",
			zIndex: 1,
			transition: {
				delay: 0.3,
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
	};

	return (
		<MenuContainer
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}>
			<Background variants={sidebar} />
			<Navigation />
			<MenuToggle toggle={() => setOpen()} />
		</MenuContainer>
	);
}

export default Menu;

const MenuContainer = styled(m.nav)`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 300px;
`;

const Background = styled(m.div)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 300px;
	background: #181818c7;
	backdrop-filter: blur(10px);
	z-index: 8;
`;
