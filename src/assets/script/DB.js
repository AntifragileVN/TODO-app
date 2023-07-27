import { createElements } from "./createElements.js";

export class DataBase {
    constructor() {}

    elementCreator = new createElements();

    // Return info of all task from DB, and create <li> elements  in given <ul> list
    getAllTasks(taskList) {
        fetch("https://64be77ea5ee688b6250c7762.mockapi.io/tasks", {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((DBtasks) => {
                taskList.textContent = "";
                DBtasks.forEach((DBelement) => {
                    this.elementCreator.createListElement(DBelement, taskList);
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    // add task to DB after creating a task
    addTaskToDB(newTask) {
        fetch("https://64be77ea5ee688b6250c7762.mockapi.io/tasks", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((task) => {})
            .catch((error) => {
                alert("addTask" + error);
            });
    }

    // change completion of task by id
    markTaskCompleted(id, boolean) {
        fetch(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`, {
            method: "PUT", // or PATCH
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ completed: boolean }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((task) => {})
            .catch((error) => {
                alert(error);
            });
    }

    // delete task from DB by id
    deleteTaskFromDB(id) {
        fetch(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((task) => {})
            .catch((error) => {
                alert(error);
            });
    }

    pagination = (page) => {
        const url = new URL(
            "https://64be77ea5ee688b6250c7762.mockapi.io/tasks"
        );
        // url.searchParams.append("completed", false);
        url.searchParams.append("page", 1);
        url.searchParams.append("limit", 4);

        fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            })
            .then((tasks) => {
                // mockapi returns first 10 tasks that are not completed
            })
            .catch((error) => {
                // handle error
            });
    };

    async taskRequest(url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
        });

        const json = await response.json();
        return json;
    }

    async getJsonTaskList() {
        const allTasks = await this.taskRequest(
            "https://64be77ea5ee688b6250c7762.mockapi.io/tasks"
        );
        return allTasks;
    }

    // Function that return last index of task in order to be able to create task element with id.
    async getLastTaskIndex() {
        try {
            const allTasks = await this.getJsonTaskList();
            const lastTask = allTasks[allTasks.length - 1];
            return lastTask.id;
        } catch (error) {
            alert("getLastIndex" + error);
        }
    }

    async getPagesQuantity(limit) {
        const allTasks = await this.getJsonTaskList();
        const taskQuantity = allTasks.length - 1;

        return Math.ceil(taskQuantity / limit);
    }
}

DataBase.elementCreator = new createElements();
