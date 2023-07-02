import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function ScreeningForm() {
	const [nowPlaying, setNowPlaying] = useState([]);
	const [selected, setSelected] = useState();
	const url = import.meta.env.VITE_BACKEND;
	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1&region=DE`
		)
			.then((response) => response.json())
			.then((data) => setNowPlaying(data.results));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(selected);
		formData.append("title", selected);

		fetch(url + "/api/create-screening", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}
	if (!nowPlaying) return;

	return (
		<Form onSubmit={handleSubmit}>
			<label htmlFor="id">Movie Title:</label>
			<select
				required
				name="id"
				id="id"
				onInput={(e) =>
					setSelected(e.target.options[e.target.selectedIndex].dataset.movie)
				}>
				<option disabled selected value="">
					Select a Movie
				</option>
				{nowPlaying &&
					nowPlaying.map((movie) => (
						<option
							key={movie.id}
							id={movie.id}
							value={movie.id}
							data-movie={movie.original_title}>
							{movie.original_title}
						</option>
					))}
			</select>
			<label htmlFor="time">Movie Time:</label>
			<select name="time" id="time">
				<option value="6:30">06:30PM</option>
				<option value="7:30">07:30PM</option>
				<option value="8:30">08:30PM</option>
				<option value="9:30">09:30PM</option>
				<option value="10:30">10:30PM</option>
			</select>
			<label htmlFor="date">Movie Date:</label>
			<input type="date" name="date" id="date" required />
			<label htmlFor="regular">Regular Seats: </label>
			<input type="number" name="regular" id="regular" />
			<label htmlFor="regular">Premium Seats: </label>
			<input type="number" name="premium" id="premium" />
			<button>Create Hall</button>
		</Form>
	);
}

export default ScreeningForm;

const Form = styled.form`
	margin: 0.5rem 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: start;
	gap: 0.5rem;
	input,
	select,
	button {
		width: 100%;
	}
`;
