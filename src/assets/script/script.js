import { DataBase } from "./DB.js";
import { createElements } from "./createElements.js";

const taskList = document.querySelector("#task-list");
const inputBox = document.querySelector("#input-box");

const paginationList = document.querySelector("#pagination");

const addTaskButton = document.querySelector(".todo__button");
const addTaskField = document.querySelector(".todo__add");

const confirmButton = document.querySelector(".todo__input-confirm");
const clearButton = document.querySelector("#input-clear-button");

const db = new DataBase();
const elementCreator = new createElements();

let allTasks = null;
let lastIndexOfTask = null;

// event listener for button which create html task elements

confirmButton.addEventListener("click", () => {
    if (inputBox.value == "") {
        alert("You must write something");
    } else {
        const task = {
            name: inputBox.value,
            completed: false,
            createdTime: new Date().getTime(),
            id: db.getLastTaskIndex() + 1,
        };
        db.addTaskToDB(task);
        db.getAllTasks(taskList);
    }
    inputBox.value = "";
});

//Clear all text from input field

clearButton.addEventListener("click", () => {
    inputBox.value = "";
    return;
});

//Add animation after clicking on button

addTaskButton.addEventListener("click", () => {
    addTaskField.classList.toggle("animation");
});

taskList.addEventListener(
    "click",
    (e) => {
        //animation on delete window
        if (
            e.target.closest(".task__delete") === null &&
            e.target.id != "my-icon"
        ) {
            let item = e.target.closest(".task__item");
            item.querySelector("#delete-window").classList.toggle(
                "task__delete-animation"
            );
        }

        if (e.target.tagName === "IMG") {
            let item = e.target.closest(".task__item");
            toggleComplitionOfTask(item);
        }

        if (e.target.closest(".task_delete-button") !== null) {
            let item = e.target.closest(".task__item");
            item.remove();
            db.deleteTaskFromDB(item.id);
        }
    },
    false
);

//Complete task
const toggleComplitionOfTask = (listItem) => {
    listItem.classList.toggle("task__completed");
    const imgElement = listItem.querySelector(".task__button-icon");

    if (imgElement.src.includes("uncompleted")) {
        imgElement.src = "./src/components/icons/task__completed-button.svg";
    } else {
        imgElement.src = "./src/components/icons/task__uncompleted-button.svg";
    }

    listItem.classList.contains("task__completed")
        ? db.markTaskCompleted(listItem.id, true)
        : db.markTaskCompleted(listItem.id, false);
};

db.getAllTasks(taskList);

export { toggleComplitionOfTask };
