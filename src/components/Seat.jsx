import "./Seat.css";

function Seat({ data, active, onClick }) {
	return (
		<button
			title={data.reserved ? "reserved" : `Seat ${data.id}`}
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
