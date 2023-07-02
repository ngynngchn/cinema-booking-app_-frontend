import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import RevenueDetails from "../components/admin-components/RevenueDetails";
import ScreeningForm from "../components/screening-form/ScreeningForm";

function AdminTest() {
	const [currentMovies, setCurrentMovies] = useState();
	const url = import.meta.env.VITE_BACKEND;

	useEffect(() => {
		fetch(url + "/api/get-screenings")
			.then((response) => response.json())
			.then((data) => setCurrentMovies(data));
	}, []);

	if (!currentMovies) return;

	return (
		<Window>
			<h2>Create a Movie Hall</h2>
			<ScreeningForm />
			{currentMovies.map((movie) => (
				<RevenueDetails id={movie.split(".")[0]} />
			))}
		</Window>
	);
}

export default AdminTest;

const Window = styled.div`
	padding: 1rem;
`;
