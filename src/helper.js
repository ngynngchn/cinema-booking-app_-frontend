export const createWeekday = (date) => {
	const dateToFormat = new Date(date);
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		day: "numeric",
	});
	return dateFormatter.format(dateToFormat);
};
