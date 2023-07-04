import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";

import Carousell from "../../components/movie-carousell/Carousell";

import styled from "styled-components";
import Menu from "../../components/menu/Menu";

function Home() {
	const [currentMovies, setCurrentMovies] = useState();
	const apiKey = import.meta.env.VITE_API_KEY;
	// (1) update current movies
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=DE`
		)
			.then((response) => response.json())
			.then((data) => setCurrentMovies(data.results));
	}, []);

	if (!currentMovies) return null;

	const routeVariants = {
		initial: {
			y: "100vh",
		},
		final: {
			y: "0vh",
		},
	};

	return (
		<Window
			key="home"
			variants={routeVariants}
			initial="initial"
			animate="final"
			transition={{ duration: 0.3 }}>
			<Head>
				<h2>Now in theatres</h2>
				{/* <Search /> */}
				<Menu />
			</Head>
			<h3>Showing Now</h3>
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

const Window = styled(m.main)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	overflow-x: scroll;
	height: 100%;
	::before {
		content: " ";
		position: absolute;
		inset: 50% 50%;
		background-color: white;
		box-shadow: 0 0 150px 150px #ffffff5a;
		width: 1px;
		height: 1px;
		border-radius: 50%;
	}
`;
const Head = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
