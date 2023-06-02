import styled from "styled-components";
import { Search } from "@styled-icons/evaicons-solid/Search";

function SearchInput() {
	return (
		<Label htmlFor="search">
			<Icon />
			<Input type="search" name="search" id="search" />
		</Label>
	);
}

export default SearchInput;

const Input = styled.input`
	text-align: left;
	border: none;
	padding: 0.4rem 0.3rem;
	padding-left: 28px;
	width: 2rem;

	background-color: grey;
	border-radius: 5px;
	transition: width 0.3s ease-in-out;
	&:hover,
	&:focus {
		width: 9rem;
	}
`;

const Icon = styled(Search)`
	width: 25px;
	height: 25px;
	margin: 1px 3px;
	position: absolute;
`;

const Label = styled.label`
	position: relative;
`;
