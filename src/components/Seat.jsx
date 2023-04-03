import "./Seat.css";

function Seat({ data, active, onClick }) {
	return (
		<button
			type="button"
			className={`Seat ${data.reserved ? "reserved" : ""} ${
				active ? "selected " : ""
			}`}
			disabled={data.reserved}
			onClick={onClick}
			value={data.id}></button>
	);
}

export default Seat;
