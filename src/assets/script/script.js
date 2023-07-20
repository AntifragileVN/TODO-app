const taskList = document.querySelector("#task-list");
const inputBox = document.querySelector("#input-box");

const addTaskButton = document.querySelector(".todo__button");
const addTaskField = document.querySelector(".todo__add");

const confirmButton = document.querySelector(".todo__input-confirm");
const clearButton = document.querySelector("#input-clear-button");

const htmlTemplete = `<li class="task__item">
                        <div class="task__item-top">
                            <p class="task__item-name" id="task-name"></p>
                                <img
                                    class="task__button-icon"ddddd
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
                    </li>`;

const elementFromHtml = (html) => {
    const templete = document.createElement("template");

    templete.innerHTML = html.trim();

    return templete.content.firstElementChild;
};

//* Function to create html task elements

confirmButton.addEventListener("click", function () {
    console.log(inputBox.value);
    if (inputBox.value == "") {
        alert("You must write something");
    } else {
        let el = elementFromHtml(htmlTemplete);
        el.querySelector("#task-name").textContent = inputBox.value;
        el.querySelector("#task-day").textContent = new Date()
            .toJSON()
            .slice(0, 10);
        el.querySelector("#task-time").textContent = (new Date() + "").slice(
            16,
            21
        );
        taskList.appendChild(el);
    }
    inputBox.value = "";
    saveData();
});

//*Clear all text from input field

clearButton.addEventListener("click", function () {
    inputBox.value = "";
    return;
});

//* Add animation after clicking on button

addTaskButton.addEventListener("click", function () {
    // addTaskField.classList.toggle("hide");
    addTaskField.classList.toggle("animation");
});

//

taskList.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "IMG") {
            const listItem = e.target.closest(".task__item");
            listItem.classList.toggle("task__completed");

            const imgElement = listItem.querySelector(".task__button-icon");

            if (imgElement.src.includes("uncompleted")) {
                imgElement.src =
                    "./src/components/icons/task__completed-button.svg";
            } else {
                imgElement.src =
                    "./src/components/icons/task__uncompleted-button.svg";
            }
            saveData();
        }
    },
    false
);

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTasks() {
    taskList.innerHTML = localStorage.getItem("data");
}
showTasks();
