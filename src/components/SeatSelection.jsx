import styled from "styled-components";

function SeatSelection({ total, children }) {
	return (
		<Frame>
			<Selected>{children}</Selected>
			<hr />
			<article>
				<h5>YOUR TOTAL</h5> <p>${total}</p>
			</article>
		</Frame>
	);
}

export default SeatSelection;

const Frame = styled.section`
	background-color: #292929;
	border-radius: 3px;
	width: 100%;
	margin-top: 1rem;
	article {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem;
	}
`;

const Selected = styled.div`
	overflow-y: scroll;
	max-height: 7.5rem;
`;
