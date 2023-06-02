import { Outlet } from "react-router-dom";
import Navigation from "../../components/basic/Navigation";
import styled from "styled-components";

function UserRoute() {
	return (
		<Layout>
			<Outlet />
			<Navigation />
		</Layout>
	);
}

export default UserRoute;

const Layout = styled.div`
	overflow: scroll;
`;
