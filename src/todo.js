import { compareAsc, toDate } from "date-fns";
import { Project } from "./project";
import { Task } from "./task";

export class Todo {

    //Constructor
    constructor() {
        this._projects = [];
        this._projects.push(new Project("inbox"));
        this._projects.push(new Project("today"));
        this._projects.push(new Project("this week"));
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

    updateTodayProject() {
        this.getProjectByName("today").list = []

        this.projects.forEach((project) => {
            if(project.name === 'today' || project.name === 'this week') {
                return
            }

            const todaysTasks = project.getTodaysTasks();

            todaysTasks.forEach((task) => {
                this.getProjectByName("today").addTask(new Task(task.name, task.description, task.date, task.status, project.name))
            })
        })
    }

    updateWeekProject() {
        this.getProjectByName("this week").list = []

        this.projects.forEach((project) => {
            if(project.name === 'today' || project.name === 'this week') {
                return
            }

            const weeksTask = project.getThisWeeksTasks();

            weeksTask.forEach((task) => {
                this.getProjectByName('this week').addTask(new Task(task.name, task.description, task.date, task.status, project.name))
            })
        })

        this.getProjectByName("this week").list = this.getProjectByName("this week").list.sort((TaskA, TaskB) => {
            compareAsc(toDate(new Date(TaskA.date)), toDate(new Date(TaskB.date)))
        })
    }
}