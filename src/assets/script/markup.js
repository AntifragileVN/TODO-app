export const markup = {
	todo: `<li class="task__item">
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
                        </li>;`,
	paginationBtn: `<li class="pagination__list-item" tabindex="0">
                                <span class="pagination__item-content" id="page"></span>
                            </li>`,
	paginationPrevBtn: `<li class="pagination__list-item" tabindex="0" id="prev">
                                <img src="./src/components/icons/pagination_arrow-left.svg" alt="" />
                            </li>`,

	paginationNextBtn: `<li class="pagination__list-item" tabindex="0" id="next">
                                <img src="./src/components/icons/pagination_arrow-right.svg" alt="" />
                            </li>`,
};
