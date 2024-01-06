const monthsOfYear = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const padWithZero = (num) => {
	return num.toString().padStart(2, '0');
};

export const getCurrentDate = () => {
	const date = new Date();

	const currentDay = daysOfWeek[date.getDay()];
	const currentDate = padWithZero(date.getDate());
	const currentMonth = monthsOfYear[date.getMonth()];

	return `${currentDay}, ${currentDate} ${currentMonth}`;
};

export const getTodoCreatedTime = (createdTime) => {
	const date = new Date(createdTime);

	const createdYear = date.getYear() + 1900;
	const createdMonth = padWithZero(date.getMonth() + 1);
	const createdDay = padWithZero(date.getDate());

	return `${createdYear}-${createdMonth}-${createdDay}`;
};
export const getTodocreatedDate = (createdTime) => {
	const date = new Date(createdTime);

	const createdHour = padWithZero(date.getHours());
	const createdMinutes = padWithZero(date.getMinutes());

	return `${createdHour}:${createdMinutes}`;
};
