import { motion as m } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

function Form({ type }) {
	const url = import.meta.env.VITE_BACKEND;
	const navigate = useNavigate();

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
			navigate("/");
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit}>
			{type == "register" && (
				<>
					<InputField type="text" name="fname" placeholder="" />
					<InputField type="text" name="lname" placeholder="" />
				</>
			)}

			<InputField type="email" name="email" placeholder="" />
			<InputField type="password" name="password" placeholder="" />

			{type == "register" && (
				<InputField type="password" name="confirmPassword" placeholder="" />
			)}

			<Submit
				whileTap={{ scale: 0.97 }}
				type="submit"
				value={`${type.toUpperCase()}`}
			/>
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

const Submit = styled(m.input).attrs({ type: "submit" })`
	background: linear-gradient(145deg, #e84849, #c33c3d);
	box-shadow: 0px 10px 100px 0px #c4504178;
	border-radius: 4px;
	margin: 1rem 0;
	padding: 0.5rem;
	border: none;
	color: white;
	cursor: pointer;
`;
