import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

import { limit, toggleActivePageClass, setPageQuantity } from '../pagination.js';
import { createListElement, displayPagination } from '../createElements.js';
import { ref } from '../script.js';

axios.defaults.baseURL = 'https://65631b1dee04015769a6cc8f.mockapi.io';

// add task to DB after creating a task
export const addTodo = async ({ name, completed, createdTime, id }) => {
	await axios
		.post('/tasks', {
			name,
			completed,
			createdTime,
			id,
		})
		.then(async (res) => {
			await pagination(1, limit);
			createListElement({ name, completed, createdTime, id });
		})
		.catch((err) => console.error(err));
};

export const changeTodoComplition = (id, boolean) => {
	try {
		axios.put(`/tasks/${id}`, {
			completed: boolean,
		});
	} catch (error) {
		console.log('CHANGE TASK COMPLITION ERROR');
		console.error(error);
	}
};

export const deleteTodo = async (id) => {
	try {
		await axios.delete(`/tasks/${id}`);
	} catch (error) {
		console.log('DELETE TASK ERROR');
		console.error(error);
	}
};

export const getAllTodos = async () => {
	try {
		const response = await axios.get('/tasks');
		return response.data;
	} catch (error) {
		console.log('GET TASK ERROR');
		console.error(error);
	}
};

export const pagination = async (page, limit) => {
	const url = new URL('https://65631b1dee04015769a6cc8f.mockapi.io/tasks');

	url.searchParams.append('sortBy', 'createdTime');
	url.searchParams.append('order', 'desc');
	url.searchParams.append('page', page);
	url.searchParams.append('limit', limit);

	axios
		.get(url)
		.then(async (res) => {
			ref.todoListRef.replaceChildren();

			res.data.forEach((DBelement) => {
				createListElement(DBelement);
			});

			ref.paginationRef.querySelectorAll('.pagination__list-item').forEach((el) => {
				if (el.value != 0) el.remove();
			});

			displayPagination(await setPageQuantity());

			toggleActivePageClass(page);
		})
		.catch((err) => console.error(err));
};

export const getLastTodoIndex = async () => {
	try {
		const allTasks = await getAllTodos();
		const lastTask = allTasks[allTasks.length - 1];
		return lastTask.id;
	} catch (error) {
		return 1;
	}
};

export const getPagesQuantity = async (limit) => {
	const allTasks = await getAllTodos();
	const taskQuantity = allTasks.length;

	return Math.ceil(taskQuantity / limit);
};
