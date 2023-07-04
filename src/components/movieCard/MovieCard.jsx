import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import styled from "styled-components";

function MovieCard({ data }) {
	const navigate = useNavigate();

	return (
		<Card onClick={() => navigate(`movie/${data.id}`)}>
			{/* <Title>{data.original_title}</Title> */}
			{/* <Subtitle></Subtitle> */}
			<Image
				$image={data.poster_path}
				src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
				alt={data.original_title}
			/>
			{/* <Mirrored
				src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
				alt={data.original_title}
			/> */}
		</Card>
	);
}

export default MovieCard;

const Card = styled.article`
	border-radius: 10px;
	position: relative;
	height: 45vh;
	scroll-snap-align: center;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	padding: 2rem 0;
	gap: 0.5rem;
`;

const Image = styled.img`
	object-fit: cover;
	aspect-ratio: 11 / 16;
	height: 100%;
	/* width: 30vw; */
	border-radius: 10px;
	// not supported in firefox!!
	-webkit-box-reflect: below 4px -webkit-gradient(linear, right top, right
				bottom, from(transparent), color-stop(90%, transparent), to(rgba(255, 255, 255, 0.442)));

	@media (max-width: 400px) {
		width: 50vw;
	}
`;
const Title = styled.h2`
	font-size: 1rem;
`;

const Subtitle = styled.h3`
	font-size: 0.8rem;
`;

// const Mirrored = styled.img`
// 	margin-top: 1.5rem;
// 	transform: rotateX(180deg) translateY(15px);
// 	mask-image: linear-gradient(transparent 80%, #ffffff89 90%, white 100%);
// 	/* filter: blur(3px) brightness(1.5); */
// 	object-fit: cover;
// 	aspect-ratio: 1.5 / 2;
// 	height: 100%;
// 	width: 30vw;
// 	border-radius: 10px;
// 	z-index: -10;

// 	@media (max-width: 400px) {
// 		width: 50vw;
// 	}
// `;
