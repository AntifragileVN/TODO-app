import {
	addTaskToDB,
	deleteTaskFromDB,
	pagination,
	markTaskCompleted,
	getLastTaskIndex,
} from './DB.js';
import { main, limit, toggleActivePageClass, setPageQuantity } from './pagination.js';
import { getTodayDate } from './createElements.js';

/=============== GENERAL TODO APP ELEMENTS ===============/;
const taskList = document.querySelector('#task-list');
const todayDate = document.querySelector('#today-date');
const paginationList = document.querySelector('#pagination');

const addTaskButton = document.querySelector('.todo__button');
const addTaskField = document.querySelector('.todo__add');

/=============== ADD TASK INPUT ===============/;
const inputBox = document.querySelector('#input-box');
const confirmButton = document.querySelector('.todo__input-confirm');
const clearButton = document.querySelector('#input-clear-button');

// event listener for button which create html task elements

async function confirm() {
	if (inputBox.value == '') {
		alert('You must write something');
		return;
	}

	await addTaskToDB({
		name: inputBox.value,
		completed: false,
		createdTime: new Date().getTime(),
		id: getLastTaskIndex() + 1,
	});

	inputBox.value = '';
}

confirmButton.addEventListener('click', () => {
	confirm();
});

inputBox.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		confirm();
	}
});

//Clear all text from input field

clearButton.addEventListener('click', () => {
	inputBox.value = '';
	return;
});

//Add animation after clicking on button

addTaskButton.addEventListener('click', () => {
	addTaskField.classList.toggle('animation');
	inputBox.focus();
});

taskList.addEventListener(
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
				taskList,
				document.querySelector('.pagination__list-item--active').value,
				limit
			);
		}
	},
	false
);

//Complete task
function toggleComplitionOfTask(listItem) {
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
todayDate.innerText = getTodayDate();

export { toggleComplitionOfTask, paginationList, taskList };
