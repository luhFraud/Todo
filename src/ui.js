import { format } from "date-fns";
import { Project } from "./project";
import { Task } from "./task";
import Storage from "./storage";

export default class UI {
    
    static loadPage() {
        UI.eventListeners()
        console.log(Storage.getTodo())
    }

    //LOAD FUNCTIONS//

    static generateProjects() {
        Storage.getTodo().projects.forEach((project) => {
            if(project.name !== 'Inbox' && project.name !== 'Today' && project.name !== 'This Week') {
                UI.createProject(project.name)
            } 
        })
    }

    //EVENT LISTENR//

    static eventListeners() {
        UI.projectForm()
    }

    static projectForm() {
        const projectSection = document.getElementById("project-section")
        const mainSection = document.getElementById("main");

        const projectBtn = document.getElementById("add-project-btn");

        const cancelProject = document.getElementById("project-cancel-btn");

        const addProject = document.getElementById("project-add-btn");

        projectBtn.addEventListener('click', function(e) {
            e.preventDefault()
            projectSection.style.display = 'flex'
            mainSection.style.filter = "blur(1px)"

        })

        cancelProject.addEventListener('click', function(e) {
            e.preventDefault();
            projectSection.style.display = 'none'
            mainSection.style.filter = "blur(0px)"
        })

        addProject.addEventListener('click', function(e) {
            e.preventDefault();

            let projectNameInput = document.getElementById("project-name");
            let projectName = projectNameInput.value.trim();
            
            if(Storage.getTodo().contains(projectName)) {
                alert(projectName + " already exist")
            } else {
                Storage.addProject(projectName)
                UI.createProject(projectName);
                console.log(Storage.getTodo().projects)
                projectSection.style.display = 'none'
                mainSection.style.filter = "blur(0px)"
            }

            projectNameInput.value = ''
        })

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