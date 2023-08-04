import { DataBase } from './DB.js';
import { createElements } from './createElements.js';
import { main, limit, toggleActivePageClass, setPageQuantity } from './pagination.js';

const taskList = document.querySelector('#task-list');
const inputBox = document.querySelector('#input-box');
const todayDate = document.querySelector('#today-date');

const paginationList = document.querySelector('#pagination');

const addTaskButton = document.querySelector('.todo__button');
const addTaskField = document.querySelector('.todo__add');

const confirmButton = document.querySelector('.todo__input-confirm');
const clearButton = document.querySelector('#input-clear-button');

const db = new DataBase();
const elementCreator = new createElements();

// event listener for button which create html task elements

const confirm = async () => {
    if (inputBox.value == '') {
        alert('You must write something');
        return;
    }

    const task = {
        name: inputBox.value,
        completed: false,
        createdTime: new Date().getTime(),
        id: db.getLastTaskIndex() + 1,
    };
    db.addTaskToDB(task);

    paginationList.querySelectorAll('.pagination__list-item').forEach((el) => {
        if (el.value != 0) el.remove();
    });

    db.pagination(taskList, 1, limit);
    elementCreator.displayPagination(paginationList, await setPageQuantity());
    toggleActivePageClass(1);

    inputBox.value = '';
};

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
    (e) => {
        //animation on delete window

        let item = e.target.closest('.task__item');

        if (e.target.closest('.task__delete') === null && e.target.id != 'my-icon') {
            item.querySelector('.task__delete').classList.toggle('task__delete-animation');
        } else if (e.target.classList.contains('task__button-icon')) {
            toggleComplitionOfTask(item);
        } else if (e.target.closest('.task_delete-button') !== null) {
            item.remove();
            db.deleteTaskFromDB(item.id);
        }
    },
    false
);

//Complete task
const toggleComplitionOfTask = (listItem) => {
    const imgElement = listItem.querySelector('.task__button-icon');
    listItem.classList.toggle('task__completed');

    if (imgElement.src.includes('uncompleted')) {
        imgElement.src = './src/components/icons/task__completed-button.svg';
        db.markTaskCompleted(listItem.id, true);
        return;
    }
    imgElement.src = './src/components/icons/task__uncompleted-button.svg';
    db.markTaskCompleted(listItem.id, false);
};

main();
todayDate.innerText = elementCreator.getTodayDate();

export { toggleComplitionOfTask, db, paginationList, elementCreator, taskList };
