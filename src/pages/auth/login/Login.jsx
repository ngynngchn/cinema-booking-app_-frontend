import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const handleSubmit = () => {};
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND;
	const clientID = import.meta.env.VITE_CLIENT_ID;

	const handleCallbackResponse = (response) => {
		encodeCredentials(response.credential);
	};

	const encodeCredentials = async (credentials) => {
		try {
			const response = await fetch(url + "/api/user-info", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ info: credentials }),
			});
			if (response.ok) {
				console.log(await response.json());
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
		google.accounts.id.renderButton(document.getElementById("signInDiv"), {
			theme: "outline",
			size: "large",
		});
	}, []);

	return (
		<div>
			{/* <form onSubmit={handleSubmit}>
				<label htmlFor="email">Your Email</label>
				<input type="email" name="email" id="email" />
				<label htmlFor="password">Your Password</label>
				<input type="password" name="password" id="password" />
				<input type="submit" value="LOGIN" />
			</form> */}
			<div id="signInDiv"></div>
		</div>
	);
}

export default Login;
