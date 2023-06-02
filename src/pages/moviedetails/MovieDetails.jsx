import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function MovieDetails() {
	const [details, setDetails] = useState();
	const params = useParams();
	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
			.then((response) => response.json())
			.then((data) => setDetails(data))
			.catch((err) => console.log(err));
	}, []);

	if (!details) return;
	return <Window $image={details.poster_path}></Window>;
}

export default MovieDetails;

const Window = styled.main`
	width: 100%;
	height: 100vh;
	background: url(https://image.tmdb.org/t/p/original/${(props) =>
			props.$image})
		100% / contain no-repeat;
`;
