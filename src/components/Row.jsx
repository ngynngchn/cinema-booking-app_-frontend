import styled from "styled-components";

function Row({ selected, onclick }) {
	return (
		<Element>
			<h5>{selected.type.toUpperCase()}</h5>
			<p> Seat {selected.id}</p>
			<p> ${selected.price}</p>
			<button value={selected.id} onClick={onclick}>
				X
			</button>
		</Element>
	);
}

export default Row;

const Element = styled.article`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	padding: 0.5rem;
`;
