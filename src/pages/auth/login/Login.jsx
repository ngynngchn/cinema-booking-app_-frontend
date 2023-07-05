import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
	const url = import.meta.env.VITE_BACKEND;
	const clientID = import.meta.env.VITE_CLIENT_ID;

	const navigate = useNavigate();
	const googleButton = useRef();

	const handleSubmit = () => {};

	// google Oauth
	const handleCallbackResponse = async (res) => {
		try {
			const response = await fetch(url + "/api/user-info", {
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
			<Form onSubmit={handleSubmit}>
				<label htmlFor="email">Your Email</label>
				<input type="email" name="email" id="email" />
				<label htmlFor="password">Your Password</label>
				<input type="password" name="password" id="password" />
				<Submit type="submit" value="LOGIN" />
			</Form>
			<p> Or continue with </p>
			<Button ref={googleButton}></Button>
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

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	input {
		border: none;
		border-radius: 4px;
		padding: 0.5rem;
	}
	input:-webkit-autofill,
	input:-webkit-autofill:focus {
		transition: background-color 600000s 0s, color 600000s 0s;
	}
	label {
		text-align: left;
	}
`;

const Submit = styled.input.attrs({ type: "submit" })`
	background: linear-gradient(145deg, #e84849, #c33c3d);
	box-shadow: 0px 10px 100px 0px #c4504178;
	border-radius: 4px;
	margin: 1rem 0;
	padding: 0.5rem;
	border: none;
`;

const Button = styled.div`
	color-scheme: light;
	margin-top: 1rem;
`;
