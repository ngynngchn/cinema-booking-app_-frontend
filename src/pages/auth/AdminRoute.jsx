import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";

function AdminRoute() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND;

	useEffect(() => {
		const authenticate = async () => {
			try {
				const response = await fetch(url + "/api/admin", {
					method: "POST",
					credentials: "include",
				});
				if (response.ok) {
					setIsLoading(false);
				} else {
					navigate("/");
					throw new Error("You have no access to this page");
				}
			} catch (error) {
				console.log("You have no access to this page");
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

export default AdminRoute;

const Layout = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: scroll;
`;
