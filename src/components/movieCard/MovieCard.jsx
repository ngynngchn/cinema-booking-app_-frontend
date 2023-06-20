import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MovieCard({ data }) {
	const navigate = useNavigate();
	return (
		<Card onClick={() => navigate(`movie/${data.id}`)}>
			<Image
				src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
				alt={data.original_title}
			/>
		</Card>
	);
}

export default MovieCard;

const Card = styled.article`
	border-radius: 10px;
	position: relative;
	height: 40vh;
	scroll-snap-align: center;
	cursor: pointer;
`;

const Image = styled.img`
	object-fit: cover;
	aspect-ratio: 1 / 2;
	height: 100%;
	width: 30vw;
	border-radius: 10px;
	@media (max-width: 400px) {
		width: 50vw;
	}
`;
