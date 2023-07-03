import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
function GoBack() {
	const navigate = useNavigate();

	return (
		<Icon
			onClick={() => {
				navigate(-1);
			}}
		/>
	);
}

export default GoBack;

const Icon = styled(ArrowIosBackOutline)`
	backdrop-filter: blur(2px);
	background-color: #c3c1c123;
	border-radius: 50%;
	height: 40px;
	min-width: 40px;
	cursor: pointer;
`;
