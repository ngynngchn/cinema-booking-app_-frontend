import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";

function UserRoute() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND;

	useEffect(() => {
		const authenticate = async () => {
			try {
				const response = await fetch(url + "/api/user", {
					method: "POST",
					credentials: "include",
				});
				if (response.ok) {
					setIsLoading(false);
				} else {
					navigate("/login");
					throw new Error();
				}
			} catch (error) {
				console.log("Please log in to continue");
			}
		};
		authenticate();
	});

	if (isLoading) return <p>Is Loading...</p>;

	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default UserRoute;

const Layout = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: scroll;
`;
