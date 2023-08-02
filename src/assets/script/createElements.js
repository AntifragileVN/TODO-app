import { currentPage, setCurrentPage, limit, controlButtonStatus } from './pagination.js';
import { toggleComplitionOfTask, db, taskList } from './script.js';

export class createElements {
    constructor() {}
    // html templete of task
    htmlTaskTemplete = `<li class="task__item">
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
                            <div class="task__delete" id="delete-window">
                                <button
                                    id="delete-button"
                                    type="button"
                                >
                                    <img
                                         class="task_delete-img"
                                        src="./src/components/icons/task__delete-button.svg"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </li>;`;
    htmlPaginationTemplete = `<li class="pagination__list-item">
                                <span class="pagination__item-content" id="page"></span>
                            </li>`;

    elementFromHtml = (html) => {
        const templete = document.createElement('template');

        templete.innerHTML = html.trim();

        return templete.content.firstElementChild;
    };

    createListElement = ({ name, completed, createdTime, id }, taskList) => {
        let listEl = this.elementFromHtml(this.htmlTaskTemplete);

        const date = new Date(createdTime);
        let dateStr = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`;

        let timeStr = `${date.getHours()}:${date.getMinutes()}`;

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

    displayPagination = (paginationList, pageQuantity) => {
        for (let i = 1; i <= pageQuantity; i++) {
            const lastElement = paginationList.lastElementChild;
            paginationList.insertBefore(this.createPaginationBtn(i), lastElement);
        }
    };

    createPaginationBtn = (pageIndex) => {
        let paginationEl = this.elementFromHtml(this.htmlPaginationTemplete);
        paginationEl.querySelector('#page').textContent = pageIndex;
        paginationEl.value = pageIndex;

        if (currentPage == pageIndex) paginationEl.classList.add('pagination__list-item--active');

        controlButtonStatus();

        paginationEl.addEventListener('click', (e) => {
            controlButtonStatus();
            setCurrentPage(pageIndex);
            db.pagination(taskList, currentPage, limit);

            let currentItemLi = document.querySelector('li.pagination__list-item--active');
            currentItemLi.classList.remove('pagination__list-item--active');

            paginationEl.classList.add('pagination__list-item--active');
        });

        return paginationEl;
    };
}
