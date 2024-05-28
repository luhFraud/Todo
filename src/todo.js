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
        this.getProjectByName("Today").list = []

        this.projects.forEach((project) => {
            if(project.name === 'Today' || project.name === 'This Week') {
                return
            }

            const todaysTasks = project.getTodaysTasks();

            todaysTasks.forEach((task) => {
                const taskName = `${task.name} (${project.name})`;
                this.getProjectByName("Today").addTask(new Task(taskName, task.description, task.date, task.status))
            })
        })
    }

    updateWeekProject() {
        this.getProjectByName("This Week").list = []

        this.projects.forEach((project) => {
            if(project.name === 'Today' || project.name === 'This Week') {
                return
            }

            const weeksTask = project.getThisWeeksTasks();

            weeksTask.forEach((task) => {
                const taskName = `${task.name} (${project.name})`;
                this.getProjectByName('This Week').addTask(new Task(taskName, task.description, task.date, task.status))
            })
        })

        this.getProjectByName("This Week").list = this.getProjectByName("This Week").list.sort((TaskA, TaskB) => {
            compareAsc(toDate(new Date(TaskA.date)), toDate(new Date(TaskB.date)))
        })
    }
}