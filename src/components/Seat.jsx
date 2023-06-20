import "./Seat.css";
import styled from "styled-components";

function Seat({ data, active, onClick }) {
	return (
		<SeatElement
			title={data.reserved ? "reserved" : `Seat ${data.id}`}
			disabled={data.reserved}
			status={data.reserved ? "reserved" : active ? "selected" : ""}
			onClick={onClick}
			value={data.id}
		/>
	);
}

export default Seat;

const SeatElement = styled.button`
	all: unset;
	width: 25px;
	height: 25px;
	border-radius: 4px;
	cursor: pointer;
	background: ${({ status }) => {
		switch (status) {
			case "reserved":
				return "linear-gradient(145deg, #1d1d1d, #181818)";
			case "selected":
				return "linear-gradient(145deg, #e84849, #c33c3d)";
			case "free":
				return "linear-gradient(145deg, #f2f2f2, #e6e6e6)";
			default:
				return "linear-gradient(145deg, #f2f2f2, #e6e6e6)";
		}
	}};

	&:not(:disabled):hover {
		background: linear-gradient(145deg, #e84849, #c33c3d);
	}
`;
