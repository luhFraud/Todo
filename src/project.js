export class Project {

    //Constructor
    constructor(name, list = []) {
        this._name = name;
        this._list = list;
    }

    //Getters 
    get name() {
        return this._name;
    }

    get list() {
        return this._list;
    }

    //Setters
    set name(name) {
        this._name = name;
    }

    set list(list) {
        this._list = list
    }

    //Functions for project objects
    getTaskByName(taskName) {
        for (const task of this._list) {
            if (task.name === taskName) {
                return task; 
            }
        }
        return null;
    }

    contains(taskName) {
        for (const task of this._list) {
            if (task.name === taskName) {
                return true; 
            }
        }
        return false;
    }

    addTask(newTask) {
        if(!this.contains(newTask.name)){
            this._list.push(newTask);
            return true;
        } else {
            return false;
        }
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter((task) => task.name !== taskName);
    }
}