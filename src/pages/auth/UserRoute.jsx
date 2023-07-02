import { Outlet } from "react-router-dom";

import styled from "styled-components";

function UserRoute() {
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
