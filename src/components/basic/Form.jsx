import styled from "styled-components";

function Form({ type }) {
	const url = import.meta.env.VITE_BACKEND;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		try {
			const response = await fetch(url + `/api/${type}`, {
				method: "POST",
				credentials: "include",
				body: form,
			});
			let message = await response.json();
			console.log(message.message);
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit}>
			{type == "register" && (
				<>
					<label htmlFor="fname">Your First Name</label>
					<input type="fname" name="fname" id="fname" />
					<label htmlFor="lname">Your Last Name</label>
					<input type="lname" name="lname" id="lname" />
				</>
			)}
			<label htmlFor="email">Your Email</label>
			<input type="email" name="email" id="email" />
			<label htmlFor="pwd">Your Password</label>
			<input type="password" name="pwd" id="pwd" />
			{type == "register" && (
				<>
					<label htmlFor="cpwd">Confirm your Password</label>
					<input type="password" name="cpwd" id="cpwd" />
				</>
			)}
			<Submit type="submit" value={`${type.toUpperCase()}`} />
		</FormContainer>
	);
}

export default Form;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
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