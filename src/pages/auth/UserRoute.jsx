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
				const response = await fetch(url + "/api/authenticate", {
					method: "POST",
					credentials: "include",
				});
				if (response.ok) {
					setIsLoading(false);
				} else {
					await fetch(url + "/api/logout", {
						method: "POST",
						credentials: "include",
					});
					navigate("/login");
				}
			} catch (error) {
				console.log(error);
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
