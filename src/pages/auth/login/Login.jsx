import React from "react";

function Login() {
	const handleSubmit = () => {};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Your Email</label>
				<input type="email" name="email" id="email" />
				<label htmlFor="password">Your Password</label>
				<input type="password" name="password" id="password" />
				<input type="submit" value="LOGIN" />
			</form>
		</div>
	);
}

export default Login;
