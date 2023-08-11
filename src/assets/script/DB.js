import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';
import { elementCreator } from './script.js';
export class DataBase {
    constructor() {}

    // Create <li> elements in given <ul> list from mockApi
    getAllTasks(taskList) {
        axios
            .get('https://64be77ea5ee688b6250c7762.mockapi.io/tasks')
            .then((res) => {
                res.data.reverse();
                taskList.replaceChildren();
                res.data.forEach((DBelement) => {
                    elementCreator.createListElement(DBelement, taskList);
                });
            })
            .catch((err) => console.log(err));
    }

    // add task to DB after creating a task
    addTaskToDB({ name, completed, createdTime, id }) {
        axios
            .post('https://64be77ea5ee688b6250c7762.mockapi.io/tasks', {
                name,
                completed,
                createdTime,
                id,
            })
            .then((res) => {})
            .catch((err) => console.error(err));
    }

    markTaskCompleted(id, boolean) {
        axios
            .put(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`, {
                completed: boolean,
            })
            .then((res) => {})
            .catch((err) => console.error(err));
    }

    deleteTaskFromDB(id) {
        axios
            .delete(`https://64be77ea5ee688b6250c7762.mockapi.io/tasks/${id}`)
            .then(() => {})
            .catch((err) => console.error(err));
    }

    async getJsonTaskList(url) {
        const response = await axios.get(url);
        const data = response.data;

        return data;
    }

    pagination = async (taskList, page, limit) => {
        let allTask = await this.getJsonTaskList(
            'https://64be77ea5ee688b6250c7762.mockapi.io/tasks'
        );
        allTask = allTask.reverse();

        const start = limit * (page - 1);
        const end = start + limit;
        const paginatedData = allTask.slice(start, end);

        taskList.replaceChildren();
        paginatedData.forEach((DBelement) => {
            elementCreator.createListElement(DBelement, taskList);
        });
    };

    async getLastTaskIndex() {
        try {
            const allTasks = await this.getJsonTaskList(
                'https://64be77ea5ee688b6250c7762.mockapi.io/tasks'
            );
            const lastTask = allTasks[allTasks.length - 1];
            return lastTask.id;
        } catch (error) {
            alert('getLastIndex' + error);
        }
    }

    async getPagesQuantity(limit) {
        const allTasks = await this.getJsonTaskList(
            'https://64be77ea5ee688b6250c7762.mockapi.io/tasks'
        );
        const taskQuantity = allTasks.length;

        return Math.ceil(taskQuantity / limit);
    }
}
