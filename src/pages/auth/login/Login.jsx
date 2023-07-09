import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Form from "../../../components/basic/Form";

function Login() {
	const url = import.meta.env.VITE_BACKEND;
	const clientID = import.meta.env.VITE_CLIENT_ID;

	const navigate = useNavigate();
	const googleButton = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		try {
			const response = await fetch(url + "/api/login", {
				method: "POST",
				credentials: "include",
				body: form,
			});
		} catch (error) {
			console.log("Error");
		}
	};

	// google Oauth
	const handleCallbackResponse = async (res) => {
		try {
			const response = await fetch(url + "/api/google-login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ info: res.credential }),
			});
			if (response.ok) {
				let user = await response.json();
				console.log(user);
				navigate("/");
			} else {
				throw new Error("That did not work!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: clientID,
			callback: handleCallbackResponse,
		});
		google.accounts.id.renderButton(googleButton.current, {
			theme: "outline",
			size: "large",
		});
	}, []);

	return (
		<Window>
			<h2>Log In </h2>
			<Form type="login" />
			<p> Or continue with </p>
			<Button ref={googleButton}></Button>
			<p>
				Don't have an account ? <Link to="/register">Sign Up</Link>!
			</p>
		</Window>
	);
}

export default Login;

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

const Button = styled.div`
	color-scheme: light;
	margin-top: 1rem;
	display: flex;
	justify-content: center;
`;
