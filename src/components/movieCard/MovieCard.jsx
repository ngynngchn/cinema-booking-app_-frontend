import { Link } from "react-router-dom";
import styled from "styled-components";

function MovieCard({ data }) {
	return (
		<Link to={`movie/${data.id}`}>
			<Card>
				<Image
					src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
					alt={data.original_title}
				/>
			</Card>
		</Link>
	);
}

export default MovieCard;

const Card = styled.article`
	border-radius: 10px;
	position: relative;
	height: 45vh;
	min-width: 30vw;
`;

const Image = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
	border-radius: 10px;
`;
