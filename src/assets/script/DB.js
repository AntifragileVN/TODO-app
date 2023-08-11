import { elementCreator } from './script.js';

export class DataBase {
    constructor() {}

    // Return info of all task from DB, and create <li> elements  in given <ul> list
    getAllTasks(taskList) {
        fetch('https://64be77ea5ee688b6250c7762.mockapi.io/tasks', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((DBtasks) => {
                DBtasks.reverse();
                taskList.replaceChildren();
                DBtasks.forEach((DBelement) => {
                    elementCreator.createListElement(DBelement, taskList);
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    // add task to DB after creating a task
    addTaskToDB(newTask) {
        fetch('https://64be77ea5ee688b6250c7762.mockapi.io/tasks', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTask),
        })
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((task) => {})
            .catch((error) => {
                alert('addTask' + error);
            });
    }

    markTaskCompleted(id, boolean) {
        fetch(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
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

    deleteTaskFromDB(id) {
        fetch(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`, {
            method: 'DELETE',
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

    pagination = async (taskList, page, limit) => {
        let allTask = await this.getJsonTaskList('https://64be77ea5ee688b6250c7762.mockapi.io/tasks');
        allTask = allTask.reverse();

        const start = limit * (page - 1);
        const end = start + limit;
        const paginatedData = allTask.slice(start, end);

        taskList.replaceChildren();
        paginatedData.forEach((DBelement) => {
            elementCreator.createListElement(DBelement, taskList);
        });
    };

    async getJsonTaskList(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        });

        const json = await response.json();
        return json;
    }

    // Function that return last index of task in order to be able to create task element with id.
    async getLastTaskIndex() {
        try {
            const allTasks = await this.getJsonTaskList('https://64be77ea5ee688b6250c7762.mockapi.io/tasks');
            const lastTask = allTasks[allTasks.length - 1];
            return lastTask.id;
        } catch (error) {
            alert('getLastIndex' + error);
        }
    }

    async getPagesQuantity(limit) {
        const allTasks = await this.getJsonTaskList('https://64be77ea5ee688b6250c7762.mockapi.io/tasks');
        const taskQuantity = allTasks.length;

        return Math.ceil(taskQuantity / limit);
    }
}
