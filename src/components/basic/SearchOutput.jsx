import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion as m } from "framer-motion";
import MovieMiniCard from "../movieCard/MovieMiniCard";

function SearchOutput({ searchTerm }) {
	const [movies, setMovies] = useState();
	const variants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=DE`
		)
			.then((response) => response.json())
			.then((data) => setMovies(data.results));
	}, []);

	if (!movies) return;
	// console.log(movies);
	const foundMovies = movies.filter(
		(movie) =>
			searchTerm !== "" &&
			movie["original_title"].toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (foundMovies.length === 0) {
		return null;
	}

	return (
		<Container variants={variants}>
			{foundMovies.map((movie) => (
				<MovieMiniCard data={movie} key={movie.id} />
			))}
		</Container>
	);
}

export default SearchOutput;

const Container = styled(m.section)`
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
