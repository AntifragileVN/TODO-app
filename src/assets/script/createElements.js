import { currentPage, setCurrentPage, limit, controlButtonStatus } from './pagination.js';
import { pagination } from './DB.js';
import { toggleComplitionOfTask, taskList } from './script.js';

// html templete of task
export const htmlTaskTemplete = `<li class="task__item">
                            <div class="task__item-wrapper">
                                <div class="task__item-top">
                                    <p class="task__item-name" id="task-name"></p>  
                                    <img
                                        class="task__button-icon"
                                        src="./src/components/icons/task__uncompleted-button.svg"
                                        id="my-icon"
                                        alt="task complete button"
                                    />
                                </div>
                                <div class="task__item-line"></div>
                                <div class="task__item-date">
                                    <p class="task__item-day" id="task-day"></p>
                                    <p class="task__item-time" id="task-time"></p>
                                </div>
                            </div>
                            <div class="task__delete">
                                <button
                                    class="task_delete-button"
                                    type="button">
                               
                                    <img
                                         class="task_delete-img"
                                        src="./src/components/icons/task__delete-button.svg"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </li>;`;
export const htmlPaginationTemplete = `<li class="pagination__list-item" tabindex="0">
                                <span class="pagination__item-content" id="page"></span>
                            </li>`;
export const htmlPrevPaginationTemplete = `<li class="pagination__list-item" tabindex="0" id="prev">
                                <img src="./src/components/icons/pagination_arrow-left.svg" alt="" />
                            </li>`;

export const htmlNextPaginationTemplete = `<li class="pagination__list-item" tabindex="0" id="next">
                                <img src="./src/components/icons/pagination_arrow-right.svg" alt="" />
                            </li>`;

export const elementFromHtml = (html) => {
	const templete = document.createElement('template');

	templete.innerHTML = html.trim();

	return templete.content.firstElementChild;
};

export const padWithZero = (num) => {
	return num.toString().padStart(2, '0');
};

export const getTodayDate = () => {
	const date = new Date();
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

	return `${daysOfWeek[date.getDay()]}, ${padWithZero(date.getDate())} ${
		monthsOfYear[date.getMonth()]
	}`;
};

export const createListElement = ({ name, completed, createdTime, id }, taskList) => {
	let listEl = elementFromHtml(htmlTaskTemplete);

	const date = new Date(createdTime);
	let dateStr = `${date.getYear() + 1900}-${padWithZero(
		date.getMonth() + 1
	)}-${padWithZero(date.getDate())}`;

	let timeStr = `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}`;

	listEl.querySelector('#task-name').textContent = name;
	listEl.querySelector('#task-day').textContent = dateStr;
	listEl.querySelector('#task-time').textContent = timeStr;
	listEl.id = id;

	if (completed) {
		toggleComplitionOfTask(listEl);
	}
	taskList.appendChild(listEl);
	return listEl;
};

export const displayPagination = (paginationList, pageQuantity) => {
	for (let i = 1; i <= pageQuantity; i++) {
		const lastElement = paginationList.lastElementChild;
		paginationList.insertBefore(createPaginationBtn(i), lastElement);
	}
};

export const createPaginationBtn = (pageIndex) => {
	let paginationEl = elementFromHtml(htmlPaginationTemplete);
	paginationEl.querySelector('#page').textContent = pageIndex;
	paginationEl.value = pageIndex;
	// paginationEl.tabIndex = pageIndex;

	if (currentPage == pageIndex)
		paginationEl.classList.add('pagination__list-item--active');

	paginationEl.addEventListener('click', (e) => {
		controlButtonStatus();
		setCurrentPage(pageIndex);
		pagination(taskList, currentPage, limit);

		let currentItemLi = document.querySelector('li.pagination__list-item--active');
		currentItemLi.classList.remove('pagination__list-item--active');

		paginationEl.classList.add('pagination__list-item--active');
	});

	return paginationEl;
};
