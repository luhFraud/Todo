import { format } from "date-fns";
import { Project } from "./project";
import { Task } from "./task";
import Storage from "./storage";

export default class UI {
    
    static loadPage() {
        UI.eventListeners()
        UI.generateProjects()
        UI.loadProjectContent('inbox')
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

    static loadProjectContent(projectName) {
        const headerTitle = document.getElementById("header-title");

        const projectDeleteBtn = document.getElementById("project-delete-btn");

        const addListBtn = document.getElementById("add-list-btn");

        const taskList = document.getElementById("task-list");

        headerTitle.innerHTML = projectName

        if(projectName === 'inbox' || projectName === 'today' || projectName === 'this week') {
            projectDeleteBtn.style.display = 'none'
        } else {
            projectDeleteBtn.style.display = 'flex'
        }

        if(projectName === 'today' || projectName === 'this week') {
            addListBtn.style.display = 'none'
        } else {
            addListBtn.style.display = 'flex'
        }

        taskList.innerHTML = '';

        let tasks = Storage.getTodo().getProjectByName(projectName).list;

        tasks.forEach((task) => {
            this.createTask(task);
        })

    }

    //EVENT LISTENR//

    static eventListeners() {
        UI.projectForm()
        UI.taskForm()
        UI.taskDescriptionToggle()
        UI.checkedTask()
        UI.activeProject()
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
            taskFormError.innerHTML = ''
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
                document.getElementById("new-task-form").reset();
                taskFormError.innerHTML = ''
                UI.createTask(newTaskObj);
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

    static checkedTask() {
        const taskList = document.getElementById('task-list');
        taskList.addEventListener('click', (e) => {
            if(e.target && e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                const taskDiv = e.target.closest('.task');
                const pDiv = taskDiv.querySelector("#task-title-p")
                if(pDiv.style.textDecoration === 'none' || !pDiv.style.textDecoration) {
                    pDiv.style.textDecoration = "line-through";
                    pDiv.style.color = "rgba(31, 29, 27, 0.2)"
                } else {
                    pDiv.style.textDecoration = "none";
                    pDiv.style.color = "rgba(31, 29, 27, 1)"
                }
            }
        })
    }

    static activeProject() {
        const projectList = document.getElementById("project-list");
        projectList.addEventListener('click', function(e)  {
            if(e.target && e.target.closest('.project')) {
                const clickedProject = e.target.closest('.project');

                document.querySelectorAll('.project').forEach((project) => {
                    project.classList.remove('active')
                })

                clickedProject.classList.add('active')

                UI.loadProjectContent(`${clickedProject.id}`)
            }
        })
    }

    //CREATE FUNCTIONS//

    static createProject(projectName) {

        const projectList = document.getElementById("project-list");

        let projectDiv = document.createElement('div');
        projectDiv.classList.add("project");
        projectDiv.setAttribute("id", projectName)

        let projectTitle = document.createElement("p");
        projectTitle.innerHTML = projectName

        projectDiv.appendChild(projectTitle);
        projectList.appendChild(projectDiv)
    }

    static createTask(task) {
        const taskList = document.getElementById("task-list");

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task')
        taskDiv.setAttribute('id', `${task.name}`)

        const taskInfoDiv = document.createElement('div');
        taskInfoDiv.setAttribute("id", "task-info")

        const taskInfoLeft = document.createElement('div');
        taskInfoLeft.setAttribute("id", "task-left");

        const taskLeftInput = document.createElement("INPUT");
        taskLeftInput.setAttribute("type", "checkbox");
        taskLeftInput.setAttribute("name", "status");
        taskLeftInput.setAttribute("id", "status");
        taskLeftInput.setAttribute("value", "true")

        const taskLeftP = document.createElement('p');
        taskLeftP.setAttribute("id", "task-title-p");
        taskLeftP.innerHTML = `${task.name}`;

        const taskInfoRight = document.createElement('div');
        taskInfoRight.setAttribute("id", "task-right");

        const taskRightDate = document.createElement("p");
        taskRightDate.setAttribute("id","task-date");
        taskRightDate.innerHTML = `${task.getFormattedDate()}`;

        const taskRightBtn = document.createElement("BUTTON");
        taskRightBtn.setAttribute("type", "button");
        taskRightBtn.innerHTML = "Details"

        // Create the first SVG
        const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgEdit.setAttribute("viewBox", "0 0 24 24");
        const titleEdit = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleEdit.textContent = "file-document-edit-outline";
        const pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEdit.setAttribute("d", "M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z");
        svgEdit.appendChild(titleEdit);
        svgEdit.appendChild(pathEdit);

        // Create the second SVG
        const svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgDelete.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgDelete.setAttribute("viewBox", "0 0 24 24");
        const titleDelete = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleDelete.textContent = "trash-can-outline";
        const pathDelete = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathDelete.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");
        svgDelete.appendChild(titleDelete);
        svgDelete.appendChild(pathDelete);

        const taskDescriptionDiv = document.createElement("div");
        taskDescriptionDiv.setAttribute("id", "task-description-div");

        const taskDescriptionBorder = document.createElement('div');

        const taskDescriptionP = document.createElement("p");
        taskDescriptionP.innerHTML = `${task.description}`

        //Append to task left
        taskInfoLeft.appendChild(taskLeftInput);
        taskInfoLeft.appendChild(taskLeftP);

        //Append to task right
        taskInfoRight.appendChild(taskRightDate);
        taskInfoRight.appendChild(taskRightBtn);
        taskInfoRight.appendChild(svgEdit);
        taskInfoRight.appendChild(svgDelete);

        //Append to task description
        taskDescriptionDiv.appendChild(taskDescriptionBorder);
        taskDescriptionDiv.appendChild(taskDescriptionP);

        //Append to task info
        taskInfoDiv.appendChild(taskInfoLeft);
        taskInfoDiv.appendChild(taskInfoRight)

        //Append to task
        taskDiv.appendChild(taskInfoDiv);
        taskDiv.appendChild(taskDescriptionDiv);

        //Append to task list
        taskList.appendChild(taskDiv);
    }
}