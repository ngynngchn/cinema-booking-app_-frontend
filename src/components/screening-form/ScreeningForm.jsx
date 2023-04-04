import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

function ScreeningForm() {
	const [nowPlaying, setNowPlaying] = useState([]);

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/movie/now_playing?api_key=d603b23be9d778e54ec780db901ad054&language=en-US&page=1&region=DE"
		)
			.then((response) => response.json())
			.then((data) => setNowPlaying(data.results));
	}, []);

	function handleSubmit(e) {
		const formData = new FormData(e.target);
		fetch("http://localhost:8888/api/create-screening", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}
	console.log(nowPlaying[0]);

	return (
		<div className="ScreeningForm">
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Movie Title:</label>
				<select name="title" id="title">
					{nowPlaying &&
						nowPlaying.map((movie) => (
							<option key={uuid4()} value={movie.id}>
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
			</form>
		</div>
	);
}

export default ScreeningForm;
