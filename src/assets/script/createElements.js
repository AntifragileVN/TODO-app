import { currentPage, setCurrentPage, limit } from './pagination.js';
import * as api from './api/index.js';
import { toggleComplitionOfTask, ref } from './script.js';
import { getTodoCreatedTime, getTodocreatedDate } from './time.js';
import { markup } from './markup.js';

export const elementFromHtml = (html) => {
	const templete = document.createElement('template');

	templete.innerHTML = html.trim();

	return templete.content.firstElementChild;
};

export const createListElement = ({ name, completed, createdTime, id }) => {
	let listEl = elementFromHtml(markup.todo);

	let dateStr = getTodocreatedDate(createdTime);
	let timeStr = getTodoCreatedTime(createdTime);

	listEl.querySelector('#task-name').textContent = name;
	listEl.querySelector('#task-day').textContent = dateStr;
	listEl.querySelector('#task-time').textContent = timeStr;
	listEl.id = id;

	if (completed) {
		toggleComplitionOfTask(listEl);
	}
	ref.todoListRef.appendChild(listEl);
	return listEl;
};

export const displayPagination = (pageQuantity) => {
	for (let i = 1; i <= pageQuantity; i++) {
		const lastElement = ref.paginationRef.lastElementChild;
		ref.paginationRef.insertBefore(createPaginationBtn(i), lastElement);
	}
};

export const createPaginationBtn = (pageIndex) => {
	let paginationEl = elementFromHtml(markup.paginationBtn);
	paginationEl.querySelector('#page').textContent = pageIndex;
	paginationEl.value = pageIndex;
	// paginationEl.tabIndex = pageIndex;

	if (currentPage == pageIndex)
		paginationEl.classList.add('pagination__list-item--active');

	paginationEl.addEventListener('click', (e) => {
		setCurrentPage(pageIndex);
		api.pagination(currentPage, limit);

		let currentItemLi = document.querySelector('li.pagination__list-item--active');
		currentItemLi.classList.remove('pagination__list-item--active');

		paginationEl.classList.add('pagination__list-item--active');
	});

	return paginationEl;
};
