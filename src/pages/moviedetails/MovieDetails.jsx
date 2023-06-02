import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../components/basic/GoBack.jsx";
import FavoriteButton from "../../components/basic/FavoriteButton.jsx";

function MovieDetails() {
	const [details, setDetails] = useState();
	const params = useParams();
	const apiKey = import.meta.env.VITE_API_KEY;
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
			.then((response) => response.json())
			.then((data) => setDetails(data))
			.catch((err) => console.log(err));
	}, []);

	if (!details) return;
	console.log(details);
	return (
		<Window $image={details.poster_path}>
			<Header>
				<BackButton />
				<FavoriteButton />
			</Header>

			<Description>
				<h4>⭐️ {details.vote_average.toFixed(2)}</h4>
				<Title>{details.title}</Title>
				<Genres>
					{details.genres.map((genre) => (
						<Badge>{genre.name}</Badge>
					))}
				</Genres>
				<Overview>{details.overview}</Overview>
			</Description>
			<BookingButton onClick={() => navigate("/booking")}>
				Book tickets
			</BookingButton>
		</Window>
	);
}

export default MovieDetails;

const Window = styled.main`
	position: relative;
	padding: 2rem;
	display: grid;
	gap: 0.5rem;
	grid-template-rows: min-content 1fr 1.5fr min-content;
	width: 100%;
	height: 100dvh;
	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(0, 0, 0, 1) 70%
		),
		url(https://image.tmdb.org/t/p/original/${(props) => props.$image}) 100% /
			cover no-repeat;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.h1`
	font-size: 1.3rem;
`;

const Badge = styled.a`
	border-radius: 10px;
	backdrop-filter: blur(10px);
	background-color: #ece3e3f4;
	padding: 0.3rem 0.6rem;
`;

const BookingButton = styled.button`
	border-radius: 10px;
	background-color: #372f2f;
	border: none;
	grid-row: 5/6;
`;
const Description = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	grid-row: 3/4;
	overflow-y: scroll;
`;
const Overview = styled.p`
	overflow-y: scroll;
`;

const Genres = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: center;
`;
