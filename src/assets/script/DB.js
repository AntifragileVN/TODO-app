import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';
import { paginationList, elementCreator, taskList } from './script.js';
import { limit, toggleActivePageClass, setPageQuantity } from './pagination.js';

export class DataBase {
	constructor() {
		axios.defaults.baseURL = 'https://65631b1dee04015769a6cc8f.mockapi.io';
	}

	// add task to DB after creating a task
	async addTaskToDB({ name, completed, createdTime, id }) {
		await axios
			.post('/tasks', {
				name,
				completed,
				createdTime,
				id,
			})
			.then(async (res) => {
				await this.pagination(taskList, 1, limit);

				elementCreator.createListElement(
					{ name, completed, createdTime, id },
					taskList
				);
			})
			.catch((err) => console.error(err));
	}

	markTaskCompleted(id, boolean) {
		axios
			.put(`/tasks/${id}`, {
				completed: boolean,
			})
			.then((res) => {})
			.catch((err) => console.error(err));
	}

	async deleteTaskFromDB(id) {
		await axios
			.delete(`/tasks/${id}`)
			.then(() => {})
			.catch((err) => console.error(err));
	}

	async getJsonTaskList(url) {
		const response = await axios.get(url);
		const data = response.data;

		return data;
	}

	pagination = async (taskList, page, limit) => {
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
					elementCreator.createListElement(DBelement, taskList);
				});

				paginationList
					.querySelectorAll('.pagination__list-item')
					.forEach((el) => {
						if (el.value != 0) el.remove();
					});

				elementCreator.displayPagination(paginationList, await setPageQuantity());

				toggleActivePageClass(page);
			})
			.catch((err) => console.error(err));
	};

	async getLastTaskIndex() {
		try {
			const allTasks = await this.getJsonTaskList('/tasks');
			const lastTask = allTasks[allTasks.length - 1];
			return lastTask.id;
		} catch (error) {
			return 1;
		}
	}

	async getPagesQuantity(limit) {
		const allTasks = await this.getJsonTaskList('/tasks');
		const taskQuantity = allTasks.length;

		return Math.ceil(taskQuantity / limit);
	}
}
