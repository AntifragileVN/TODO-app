import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';
import { paginationList, taskList } from './script.js';
import { limit, toggleActivePageClass, setPageQuantity } from './pagination.js';
import { createListElement, displayPagination } from './createElements.js';

axios.defaults.baseURL = 'https://65631b1dee04015769a6cc8f.mockapi.io';

// add task to DB after creating a task
export const addTaskToDB = async ({ name, completed, createdTime, id }) => {
	await axios
		.post('/tasks', {
			name,
			completed,
			createdTime,
			id,
		})
		.then(async (res) => {
			await pagination(taskList, 1, limit);

			createListElement({ name, completed, createdTime, id }, taskList);
		})
		.catch((err) => console.error(err));
};

export const markTaskCompleted = (id, boolean) => {
	axios
		.put(`/tasks/${id}`, {
			completed: boolean,
		})
		.then((res) => {})
		.catch((err) => console.error(err));
};

export const deleteTaskFromDB = async (id) => {
	await axios
		.delete(`/tasks/${id}`)
		.then(() => {})
		.catch((err) => console.error(err));
};

export const getJsonTaskList = async (url) => {
	const response = await axios.get(url);
	const data = response.data;

	return data;
};

export const pagination = async (taskList, page, limit) => {
	const url = new URL('https://65631b1dee04015769a6cc8f.mockapi.io/tasks');

	url.searchParams.append('sortBy', 'createdTime');
	url.searchParams.append('order', 'desc');
	url.searchParams.append('page', page);
	url.searchParams.append('limit', limit);

	axios
		.get(url)
		.then(async (res) => {
			taskList.replaceChildren();

			res.data.forEach((DBelement) => {
				createListElement(DBelement, taskList);
			});

			paginationList.querySelectorAll('.pagination__list-item').forEach((el) => {
				if (el.value != 0) el.remove();
			});

			displayPagination(paginationList, await setPageQuantity());

			toggleActivePageClass(page);
		})
		.catch((err) => console.error(err));
};

export const getLastTaskIndex = async () => {
	try {
		const allTasks = await getJsonTaskList('/tasks');
		const lastTask = allTasks[allTasks.length - 1];
		return lastTask.id;
	} catch (error) {
		return 1;
	}
};

export const getPagesQuantity = async (limit) => {
	const allTasks = await getJsonTaskList('/tasks');
	const taskQuantity = allTasks.length;

	return Math.ceil(taskQuantity / limit);
};
