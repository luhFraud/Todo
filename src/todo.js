import { Project } from "./project";
import { Task } from "./task";

export class todo {

    //Constructor
    constructor() {
        this._projects = [];
        this._projects.push(new Project("Indox"));
        this._projects.push(new Project("Today"));
        this._projects.push(new Project("This Week"));
    }

    //Getters and Setters
    get projects(){
        return this._projects;
    }

    set projects(projects){
        this._projects = projects;
    }

    //Functions for todo objects
}