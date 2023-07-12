import styled, { css } from "styled-components";
import { EyeFill } from "@styled-icons/bootstrap/EyeFill";
import { EyeSlashFill } from "@styled-icons/bootstrap/EyeSlashFill";
import { User } from "@styled-icons/boxicons-solid/User";
import { Mail } from "@styled-icons/fluentui-system-filled/Mail";
import { useState } from "react";

function InputField({ type, name, placeholder }) {
	const [open, setOpen] = useState(false);

	return (
		<Label htmlFor={name}>
			{open && type === "password" ? (
				<OpenEye onClick={() => setOpen(false)} />
			) : !open && type === "password" ? (
				<ClosedEye onClick={() => setOpen(true)} />
			) : type === "email" ? (
				<Email />
			) : name.includes("name") ? (
				<UserIcon />
			) : null}

			<Input
				type={open ? "text" : type}
				name={name}
				id={name}
				placeholder={placeholder}
			/>
		</Label>
	);
}

export default InputField;

const iconStyle = css`
	height: 15px;
	z-index: 1;
	margin: 0.5rem;
`;

const Input = styled.input`
	position: absolute;
	width: 100%;
`;

const Label = styled.label`
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const OpenEye = styled(EyeFill)`
	${iconStyle}
	cursor:pointer;
`;

const ClosedEye = styled(EyeSlashFill)`
	cursor: pointer;
	${iconStyle}
`;

const UserIcon = styled(User)`
	${iconStyle}
`;

const Email = styled(Mail)`
	${iconStyle}
`;
