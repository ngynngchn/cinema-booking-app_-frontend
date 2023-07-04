import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MovieMiniCard({ data }) {
	const navigate = useNavigate();
	return (
		<Card onClick={() => navigate(`/movie/${data.id}`)}>
			<Img
				src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
				alt={data.original_title}
			/>
			<h3>{data.original_title}</h3>
		</Card>
	);
}

export default MovieMiniCard;

const Card = styled.section`
	width: 100%;
	h3 {
		font-size: 1rem;
	}
`;

const Img = styled.img`
	border-radius: 10px;
	object-fit: cover;
	width: 50%;
`;
