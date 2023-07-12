import styled from "styled-components";
import Form from "../../components/basic/Form.jsx";
import { Link } from "react-router-dom";

function Register() {
	return (
		<Window>
			<h2>Sign up!</h2>
			<Form type="register" />
			<p>
				Already have an account? <Link to="/login">Sign In!</Link>!
			</p>
		</Window>
	);
}

export default Register;

const Window = styled.main`
	display: grid;
	place-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	::before {
		content: " ";
		position: absolute;
		inset: 0% 0%;
		background-color: white;
		box-shadow: 0 0 150px 150px #ffffff5a;
		width: 1px;
		height: 1px;
		border-radius: 50%;
		/* z-index: -1; */
	}
	::after {
		content: " ";
		position: absolute;
		inset: 100% 100%;
		background-color: white;
		box-shadow: 0 0 150px 150px #ffffff5a;
		width: 1px;
		height: 1px;
		border-radius: 50%;
		/* z-index: -1; */
	}
`;
