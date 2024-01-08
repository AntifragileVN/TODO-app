import * as api from './api/index.js';
import { ref } from './script.js';
import { displayPagination } from './createElements.js';

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let currentPage = 1;
let pageQuantity = undefined;
const limit = 4;

function setCurrentPage(newPage) {
	currentPage = newPage;
	return currentPage;
}

async function setPageQuantity() {
	pageQuantity = await api.getPagesQuantity(limit);
	return pageQuantity;
}

async function main() {
	pageQuantity = await api.getPagesQuantity(limit);
	await api.pagination(currentPage, limit);
	displayPagination(pageQuantity);
}

const handlePaginationArrowClick = async (value) => {
	const nextPage = currentPage + value;
	if (nextPage != 0 && nextPage <= pageQuantity) {
		setCurrentPage(nextPage);
		await api.pagination(currentPage, limit);
		toggleActivePageClass(nextPage);
	}
};

prevButton.addEventListener('click', () => handlePaginationArrowClick(-1));

nextButton.addEventListener('click', () => handlePaginationArrowClick(1));

function toggleActivePageClass(nextPage) {
	let currentItemLi = document.querySelector('li.pagination__list-item--active');
	currentItemLi.classList.remove('pagination__list-item--active');

	let allpaginationBtn = [...document.querySelectorAll('.pagination__list-item')];

	let nextItem = allpaginationBtn.filter((el) => el.value === nextPage);
	nextItem[0].classList.add('pagination__list-item--active');
}

export {
	currentPage,
	main,
	setCurrentPage,
	limit,
	toggleActivePageClass,
	pageQuantity,
	setPageQuantity,
};
