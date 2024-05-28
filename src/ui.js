import { format } from "date-fns";
import { Project } from "./project";
import { Task } from "./task";
import Storage from "./storage";

export default class UI {
    
    static loadPage() {
        UI.eventListeners()
        UI.generateProjects()
        //localStorage.clear()
        console.log(Storage.getTodo())
    }

    //LOAD FUNCTIONS//

    static generateProjects() {
        Storage.getTodo().projects.forEach((project) => {
            if(project.name !== 'inbox' && project.name !== 'today' && project.name !== 'this week') {
                UI.createProject(project.name)
            } 
        })
    }

    //EVENT LISTENR//

    static eventListeners() {
        UI.projectForm()
        UI.taskForm()
        UI.taskDescriptionToggle()
    }

    static projectForm() {
        const projectSection = document.getElementById("project-section")
        const mainSection = document.getElementById("main");

        const projectBtn = document.getElementById("add-project-btn");

        const cancelProject = document.getElementById("project-cancel-btn");

        const addProject = document.getElementById("project-add-btn");

        const projectFormError = document.getElementById("project-form-error");

        projectBtn.addEventListener('click', function(e) {
            e.preventDefault()
            projectSection.style.display = 'flex'
            mainSection.style.filter = "blur(1px)"

        })

        cancelProject.addEventListener('click', function(e) {
            e.preventDefault();
            projectSection.style.display = 'none'
            mainSection.style.filter = "blur(0px)"
            projectFormError.innerHTML = ''
        })

        addProject.addEventListener('click', function(e) {
            e.preventDefault();

            let projectNameInput = document.getElementById("project-name");
            let projectName = projectNameInput.value.toLowerCase().trim();
            
            if(Storage.getTodo().contains(projectName)) {
                projectFormError.innerHTML = `${projectName} already exists`;
                return
            } else {
                let newProjectObj = new Project(projectName);
                Storage.addProject(newProjectObj)
                UI.createProject(projectName);
                projectSection.style.display = 'none'
                mainSection.style.filter = "blur(0px)"
                projectNameInput.value = '';
                projectFormError.innerHTML = ''
                console.log(Storage.getTodo().projects)
            }
        })

    }

    static taskForm() {
        const taskSection = document.getElementById("task-section");
        const mainSection = document.getElementById("main");

        const taskBtn = document.getElementById("add-list-btn");

        const addTask = document.getElementById("task-add-btn");

        const cancelTask = document.getElementById("task-cancel-btn");

        const taskFormError = document.getElementById("task-form-error");

        taskBtn.addEventListener('click', function(e) {
            e.preventDefault()
            taskSection.style.display = 'flex'
            mainSection.style.filter = "blur(1px)"
       })

       cancelTask.addEventListener('click', function(e) {
            e.preventDefault()
            taskSection.style.display = 'none'
            mainSection.style.filter = "blur(0px)"
       })

       addTask.addEventListener('click', function(e) {
            e.preventDefault()

            let headerTitle = document.getElementById("header-title");
            let projectName = headerTitle.innerHTML.toLowerCase().trim()

            let taskNameInput = document.getElementById("task-title");
            let taskName = taskNameInput.value.toLowerCase().trim();

            let taskDateInput = document.getElementById("task-date")
            let taskDate = taskDateInput.value;

            let taskDescriptionInput = document.getElementById("task-description");
            let taskDescription = taskDescriptionInput.value;

            if(Storage.getTodo().getProjectByName(projectName).contains(taskName)) {
                taskFormError.innerHTML = `${taskName} already exists in ${projectName}`
                return
            } else {
                let newTaskObj = new Task(taskName,taskDescription, taskDate)
                Storage.addTask(projectName, newTaskObj);
                taskSection.style.display = 'none'
                mainSection.style.filter = "blur(0px)"
                taskNameInput.value = '';
                taskDateInput.value = '';
                taskDescriptionInput.value = '';
                taskFormError.innerHTML = ''
                console.log(Storage.getTodo().projects)
            }
       })
    }

    static taskDescriptionToggle() {
        const taskList = document.getElementById('task-list');
        taskList.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === 'BUTTON' && e.target.type === 'button') {
                e.preventDefault();
                const taskDiv = e.target.closest('.task');
                const descriptionDiv = taskDiv.querySelector('#task-description-div');
                if (descriptionDiv.style.display === 'none' || !descriptionDiv.style.display) {
                    descriptionDiv.style.display = 'block';
                    e.target.classList.add('toggled');
                } else {
                    descriptionDiv.style.display = 'none';
                    e.target.classList.remove('toggled');
                }
            }
        });
    }

    //CREATE FUNCTIONS//

    static createProject(projectName) {

        const projectList = document.getElementById("project-list");

        let projectDiv = document.createElement('div');
        projectDiv.classList.add("project");

        let projectTitle = document.createElement("p");
        projectTitle.innerHTML = projectName

        projectDiv.appendChild(projectTitle);
        projectList.appendChild(projectDiv)
    }
}