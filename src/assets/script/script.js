import {
	addTaskToDB,
	deleteTaskFromDB,
	pagination,
	markTaskCompleted,
	getLastTaskIndex,
} from './DB.js';
import { main, limit, toggleActivePageClass, setPageQuantity } from './pagination.js';
import { getCurrentDate } from './time.js';

export const ref = {
	todoListRef: document.querySelector('#task-list'),
	todayDateRef: document.querySelector('#today-date'),
	paginationRef: document.querySelector('#pagination'),

	addTodoBtn: document.querySelector('.todo__button'),
	addTodoBoxRef: document.querySelector('.todo__add'),

	addTodoInput: document.querySelector('#input-box'),
	confirmBtn: document.querySelector('.todo__input-confirm'),
	clearBtn: document.querySelector('#input-clear-button'),
};

// event listener for button which create html task elements

async function confirm() {
	if (addTodoInput.value == '') {
		alert('You must write something');
		return;
	}

	await addTaskToDB({
		name: addTodoInput.value,
		completed: false,
		createdTime: new Date().getTime(),
		id: getLastTaskIndex() + 1,
	});

	addTodoInput.value = '';
}

ref.confirmBtn.addEventListener('click', () => {
	confirm();
});

ref.addTodoInput.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		confirm();
	}
});

//Clear all text from input field

ref.clearBtn.addEventListener('click', () => {
	addTodoInput.value = '';
	return;
});

//Add animation after clicking on button

ref.addTodoBtn.addEventListener('click', () => {
	addTodoBoxRef.classList.toggle('animation');
	addTodoInput.focus();
});

ref.todoListRef.addEventListener(
	'click',
	async (e) => {
		//animation on delete window
		let item = e.target.closest('.task__item');

		if (e.target.closest('.task__delete') === null && e.target.id != 'my-icon') {
			item.querySelector('.task__delete').classList.toggle(
				'task__delete-animation'
			);
		} else if (e.target.classList.contains('task__button-icon')) {
			toggleComplitionOfTask(item);
		} else if (e.target.closest('.task_delete-button') !== null) {
			item.remove();
			await deleteTaskFromDB(item.id);
			pagination(
				document.querySelector('.pagination__list-item--active').value,
				limit
			);
		}
	},
	false
);

//Complete task
export function toggleComplitionOfTask(listItem) {
	const imgElement = listItem.querySelector('.task__button-icon');
	listItem.classList.toggle('task__completed');

	if (imgElement.src.includes('uncompleted')) {
		imgElement.src = './src/components/icons/task__completed-button.svg';
		markTaskCompleted(listItem.id, true);
		return;
	}
	imgElement.src = './src/components/icons/task__uncompleted-button.svg';
	markTaskCompleted(listItem.id, false);
}

main();
ref.todayDateRef.innerText = getCurrentDate();
