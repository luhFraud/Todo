import { Project } from "./project";
import { Task } from "./task";
import { Todo } from "./todo";

export default class Storage {
    static saveTodo(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }

    static getTodo() {
        const todoData = JSON.parse(localStorage.getItem("todo"));
        const todo = new Todo();

        if (todoData) {
            todo.projects = todoData.projects.map(project => new Project(project.name));
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
}