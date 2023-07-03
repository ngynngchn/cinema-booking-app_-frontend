import styled from "styled-components";
import { BookmarkOutline } from "@styled-icons/evaicons-outline/BookmarkOutline";

function FavoriteButton() {
	return <Icon />;
}

export default FavoriteButton;
const Icon = styled(BookmarkOutline)`
	backdrop-filter: blur(2px);
	background-color: #c3c1c123;
	border-radius: 50%;
	height: 40px;
	min-width: 40px;
	padding: 0.2rem;
	cursor: pointer;
`;
