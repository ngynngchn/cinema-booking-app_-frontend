import styled from "styled-components";
import RevenueDetails from "../components/admin-components/RevenueDetails";
import ScreeningForm from "../components/screening-form/ScreeningForm";

function AdminTest() {
	return (
		<Window>
			<h2>Create a Movie Hall</h2>
			<ScreeningForm />
			<RevenueDetails id="667538" />
		</Window>
	);
}

export default AdminTest;

const Window = styled.div`
	padding: 1rem;
`;
