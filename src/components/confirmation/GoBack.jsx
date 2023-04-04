import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

function GoBack() {
	const navigate = useNavigate();

	return (
		<Icon
			onClick={() => {
				navigate(-1);
			}}
			className="backIcon"
			icon="material-symbols:arrow-back-ios-new-rounded"
		/>
	);
}

export default GoBack;
