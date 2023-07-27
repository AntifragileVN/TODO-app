import { DataBase } from "./DB.js";

const taskList = document.querySelector("#task-list");
const inputBox = document.querySelector("#input-box");

const paginationList = document.querySelector("#pagination");

const addTaskButton = document.querySelector(".todo__button");
const addTaskField = document.querySelector(".todo__add");

const confirmButton = document.querySelector(".todo__input-confirm");
const clearButton = document.querySelector("#input-clear-button");

const db = new DataBase();

let allTasks = null;
let lastIndexOfTask = null;

// html templete of task
const htmlTemplete = `<li class="task__item">
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
                                    class="task_delete-button"
                                    id="delete-button"
                                    type="button"
                                >
                                    <img
                                        src="./src/components/icons/task__delete-button.svg"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </li>`;

const elementFromHtml = (html) => {
    const templete = document.createElement("template");

    templete.innerHTML = html.trim();

    return templete.content.firstElementChild;
};

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

// Create task and add to task list from given object
const createListElement = ({ name, completed, createdTime, id }) => {
    let listEl = elementFromHtml(htmlTemplete);

    const date = new Date(createdTime);
    let dateStr = `${date.getYear() + 1900}-${
        date.getMonth() + 1
    }-${date.getDate()}`;

    let timeStr = `${date.getHours()}:${date.getMinutes()}`;

    listEl.querySelector("#task-name").textContent = name;
    listEl.querySelector("#task-day").textContent = dateStr;
    listEl.querySelector("#task-time").textContent = timeStr;
    listEl.id = id;

    if (completed) {
        toggleComplitionOfTask(listEl);
    }
    taskList.appendChild(listEl);
    return listEl;
};

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
export { createListElement };
