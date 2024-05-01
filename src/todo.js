import { Project } from "./project";
import { Task } from "./task";

export class Todo {

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
    getProjectByName(projectName) {
        for(const project of this._projects){
            if (project.name === projectName){
                return project
            }
        }

        return null;
    }

    contains(projectName) {
        for(const project of this._projects){
            if (project.name === projectName){
                return true;
            }
        }

        return false;
    }

    addProject(newProject) {
        if (!this.contains(newProject.name)) {
            this._projects.push(newProject);
            return true;
        } else {
            return false;     
        }
    }
    
    deleteProject(projectName) {
        
        const index = this._projects.findIndex(project => project.name === projectName);
        
        if (index !== -1) {
            this._projects.splice(index, 1);
            return true; 
        }
        return false;
    }
}