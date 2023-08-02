import { db } from './script.js';
import { elementCreator, paginationList, taskList } from './script.js';

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let currentPage = 1;
let limit = 4;

const disableButton = (button) => {
    button.setAttribute('disabled', true);
};

const enableButton = (button) => {
    button.removeAttribute('disabled');
};

const setCurrentPage = (newPage) => {
    currentPage = newPage;
    return currentPage;
};

const getCurrentPage = () => {
    return currentPage;
};

const controlButtonStatus = async (limit) => {
    currentPage === 1 ? disableButton(prevButton) : enableButton(prevButton);

    currentPage === (await db.getPagesQuantity(limit)) ? disableButton(nextButton) : enableButton(nextButton);
};

async function main() {
    db.pagination(taskList, currentPage, limit);

    elementCreator.displayPagination(paginationList, await db.getPagesQuantity(limit));
    controlButtonStatus(limit);
}

prevButton.addEventListener('click', async (e) => {
    await controlButtonStatus(limit);

    if (prevButton.getAttribute('disabled') == null) {
        const nextPage = setCurrentPage(getCurrentPage() - 1);
        db.pagination(taskList, currentPage, limit);
        toggleActivePageClass(nextPage);
    }
});

nextButton.addEventListener('click', async (e) => {
    await controlButtonStatus(limit);

    if (nextButton.getAttribute('disabled') == null) {
        const nextPage = setCurrentPage(getCurrentPage() + 1);
        db.pagination(taskList, currentPage, limit);
        toggleActivePageClass(nextPage);
    }
});

const toggleActivePageClass = (nextPage) => {
    let currentItemLi = document.querySelector('li.pagination__list-item--active');
    currentItemLi.classList.remove('pagination__list-item--active');

    let allpaginationBtn = [...document.querySelectorAll('.pagination__list-item')];

    let nextItem = allpaginationBtn.filter((el) => el.value === nextPage);
    nextItem[0].classList.add('pagination__list-item--active');
};

export { currentPage, controlButtonStatus, main, setCurrentPage, limit };
