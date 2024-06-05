import { Project } from "./project";
import { Task } from "./task";
import { Todo } from "./todo";

export default class Storage {
    static saveTodo(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }

    static getTodo() {
        const todoData = JSON.parse(localStorage.getItem('todo'));
        const todo = Object.assign(new Todo(), todoData);

        if (todo.projects) {
            todo.projects = todo.projects.map((project) => {
                const projectInstance = Object.assign(new Project(), project);
                projectInstance.list = projectInstance.list.map((task) => Object.assign(new Task(), task));
                return projectInstance;
        });
    }

    return todo;
} 

    static addProject(project) {
        const todo = Storage.getTodo()
        todo.addProject(project)
        Storage.saveTodo(todo)
    }

    static deleteProject(projectName) {
        const todo = Storage.getTodo()
        todo.deleteProject(projectName)
        Storage.saveTodo(todo)
    }

    static addTask(projectName, task) {
        const todo = Storage.getTodo()
        todo.getProjectByName(projectName).addTask(task)
        Storage.saveTodo(todo);
    }

    static deleteTask(projectName, taskName) {
        const todo = Storage.getTodo()
        todo.getProjectByName(projectName).deleteTask(taskName)
        Storage.saveTodo(todo)
    }

    static renameTask(projectName, taskName, newTaskName) {
        const todo = Storage.getTodo()
        todo.getProjectByName(projectName).getTaskByName(taskName).name = newTaskName
        Storage.saveTodo(todo)
    }

    static setTaskName(projectName, taskName, newName){
        const todo = Storage.getTodo();
        todo.getProjectByName(projectName).getTaskByName(taskName).name = newName;
        Storage.saveTodo(todo);
    }

    static setTaskDescription(projectName, taskName, newDescription){
        const todo = Storage.getTodo();
        todo.getProjectByName(projectName).getTaskByName(taskName).description = newDescription;
        Storage.saveTodo(todo);
    }

    static setTaskDate(projectName, taskName, newDate) {
        const todo = Storage.getTodo()
        todo.getProjectByName(projectName).getTaskByName(taskName).date = newDate
        Storage.saveTodo(todo)
    }

    static setTaskStatus(projectName, taskName, newStatus) {
        const todo = Storage.getTodo();
        todo.getProjectByName(projectName).getTaskByName(taskName).status = newStatus;
        Storage.saveTodo(todo);
    }

    static updateTodayProject() {
        const todo = Storage.getTodo()
        todo.updateTodayProject()
        Storage.saveTodo(todo)
    }

    static updateWeekProject() {
        const todo = Storage.getTodo()
        todo.updateWeekProject()
        Storage.saveTodo(todo)
    }
    
}