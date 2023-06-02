import { useState, useEffect } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import Search from "../../components/basic/Search";
import Carousell from "../../components/movie-carousell/Carousell";

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
			<Head>
				<h2>Now in theatres</h2>
				<Search />
			</Head>
			<Carousell items={currentMovies} />
			{/* <Carousell>
				{currentMovies.map((movies) => (
					<MovieCard data={movies} />
				))}
			</Carousell> */}
		</Window>
	);
}

export default Home;

// const Carousell = styled.section`
// 	display: flex;
// 	gap: 1rem;
// 	width: 100%;
// 	overflow-x: scroll;
// 	scroll-snap-type: x mandatory;
// `;

const Window = styled.main`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	overflow-x: scroll;
`;
const Head = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
