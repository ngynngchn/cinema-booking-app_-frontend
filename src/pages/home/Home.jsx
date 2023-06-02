import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/movieCard/MovieCard";
import styled from "styled-components";

function Home() {
	const [currentMovies, setCurrentMovies] = useState();
	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/movie/now_playing?api_key=d603b23be9d778e54ec780db901ad054&language=en-US&page=1&region=DE"
		)
			.then((response) => response.json())
			.then((data) => setCurrentMovies(data.results));
	}, []);
	console.log(currentMovies);

	if (!currentMovies) return;

	return (
		<Window>
			<h2>Welcome to our Theater</h2>
			<Link to="/booking">Book your seat</Link>
			<Link to="/admin">Admin</Link>
			<h2>Now in Cinemas</h2>
			<Carousell>
				{currentMovies.map((movies) => (
					<MovieCard data={movies} />
				))}
			</Carousell>
		</Window>
	);
}

export default Home;

const Carousell = styled.section`
	display: flex;
	gap: 1rem;
	width: 100%;
	overflow-x: scroll;
`;

const Window = styled.main`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
`;
