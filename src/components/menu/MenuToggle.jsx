import { motion } from "framer-motion";
import styled from "styled-components";

const Path = (props) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 4.761904761904745%, 75.29411764705883%)"
		strokeLinecap="round"
		{...props}
	/>
);

function MenuToggle({ toggle }) {
	return (
		<Toggle onClick={toggle}>
			<svg width="23" height="23" viewBox="0 0 23 23">
				<Path
					variants={{
						closed: { d: "M 2 2.5 L 20 2.5", zIndex: 100 },
						open: { d: "M 3 16.5 L 17 2.5", zIndex: 100 },
					}}
				/>
				<Path
					d="M 2 9.423 L 20 9.423"
					variants={{
						closed: { opacity: 1, zIndex: 100 },
						open: { opacity: 0, zIndex: 100 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					variants={{
						closed: { d: "M 2 16.346 L 20 16.346", zIndex: 100 },
						open: { d: "M 3 2.5 L 17 16.346", zIndex: 100 },
					}}
				/>
			</svg>
		</Toggle>
	);
}

export default MenuToggle;

const Toggle = styled.button`
	outline: none;
	border: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	cursor: pointer;
	position: absolute;
	top: 18px;
	right: 15px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: transparent;
	z-index: 10000;
`;
