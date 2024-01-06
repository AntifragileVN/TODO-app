import { getPagesQuantity, pagination } from './DB.js';
import { paginationList, taskList } from './script.js';
import { displayPagination } from './createElements.js';

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let currentPage = 1;
let pageQuantity = undefined;
const limit = 4;

function disableButton(button) {
	button.setAttribute('disabled', true);
}

function enableButton(button) {
	button.removeAttribute('disabled');
}

function setCurrentPage(newPage) {
	currentPage = newPage;
	return currentPage;
}

async function setPageQuantity() {
	pageQuantity = await getPagesQuantity(limit);
	return pageQuantity;
}

function controlButtonStatus() {
	currentPage === 1 ? disableButton(prevButton) : enableButton(prevButton);

	currentPage === pageQuantity ? disableButton(nextButton) : enableButton(nextButton);
}

async function main() {
	pageQuantity = await getPagesQuantity(limit);
	await pagination(taskList, currentPage, limit);
	displayPagination(paginationList, pageQuantity);
}

prevButton.addEventListener('click', () => {
	controlButtonStatus();

	if (prevButton.getAttribute('disabled') == null) {
		const nextPage = setCurrentPage(currentPage - 1);
		pagination(taskList, currentPage, limit);
		toggleActivePageClass(nextPage);
	}
});

nextButton.addEventListener('click', () => {
	controlButtonStatus();

	if (nextButton.getAttribute('disabled') == null) {
		const nextPage = setCurrentPage(currentPage + 1);
		pagination(taskList, currentPage, limit);
		toggleActivePageClass(nextPage);
	}
});

function toggleActivePageClass(nextPage) {
	let currentItemLi = document.querySelector('li.pagination__list-item--active');
	currentItemLi.classList.remove('pagination__list-item--active');

	let allpaginationBtn = [...document.querySelectorAll('.pagination__list-item')];

	let nextItem = allpaginationBtn.filter((el) => el.value === nextPage);
	nextItem[0].classList.add('pagination__list-item--active');
}

export {
	currentPage,
	controlButtonStatus,
	main,
	setCurrentPage,
	limit,
	toggleActivePageClass,
	pageQuantity,
	setPageQuantity,
};
