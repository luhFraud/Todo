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
    
        headerTitle.innerHTML = projectName;
        taskList.innerHTML = '';
    
        const settings = {
            'inbox': {
                projectDeleteBtn: 'none',
                addListBtn: 'flex'
            },
            'today': {
                projectDeleteBtn: 'none',
                addListBtn: 'none',
                updateProject: () => Storage.updateTodayProject()
            },
            'this week': {
                projectDeleteBtn: 'none',
                addListBtn: 'none',
                updateProject: () => Storage.updateWeekProject()
            },
            'default': {
                projectDeleteBtn: 'flex',
                addListBtn: 'flex'
            }
        };
    
        const projectSettings = settings[projectName] || settings['default'];
        projectDeleteBtn.style.display = projectSettings.projectDeleteBtn;
        addListBtn.style.display = projectSettings.addListBtn;
    
        if (projectSettings.updateProject) {
            projectSettings.updateProject();
            console.log(Storage.getTodo());
        }
    
        let tasks = Storage.getTodo().getProjectByName(projectName).list;
        tasks.forEach((task) => {
            this.createTask(task);
        });
    }

    //EVENT LISTENR//

    static eventListeners() {
        UI.projectForm()
        UI.taskForm()
        UI.taskDescriptionToggle()
        UI.checkedTask()
        UI.activeProject()
        UI.deleteProject()
        UI.deleteTask()
        UI.editTask()
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

            let taskDateInput = document.getElementById("task-date-input")
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

    static deleteProject() {
        const projectDeleteSection = document.getElementById("project-delete-section");
        const mainSection = document.getElementById("main");

        const projectDeleteBtn = document.getElementById("project-delete-btn");
        const projectDeleteNoBtn = document.getElementById("project-delete-no");
        const projectDeleteYesBtn = document.getElementById("project-delete-yes");
        const projectDeleteMsg = document.getElementById("project-delete-message");

        projectDeleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectDiv = document.querySelector(".project.active");
            const projectName = projectDiv.id;

            projectDeleteSection.style.display = 'flex';
            mainSection.style.filter = "blur(1px)";
            projectDeleteMsg.innerHTML = `Do you want to delete project: ${projectName}?`;
        });

        projectDeleteNoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectDeleteSection.style.display = 'none';
            mainSection.style.filter = "blur(0px)";
        });

        projectDeleteYesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectDiv = document.querySelector(".project.active");
            const projectName = projectDiv.id;

            Storage.deleteProject(projectName);

            projectDiv.remove();

            projectDeleteSection.style.display = 'none';
            mainSection.style.filter = "blur(0px)";

            const inboxProjectDiv = document.getElementById("inbox");
            inboxProjectDiv.classList.add("active");


            UI.loadProjectContent('inbox')
        });
    }

    static deleteTask() {
        const taskList = document.getElementById('task-list');
    
        const taskDeleteSection = document.getElementById("task-delete-section");
        const mainSection = document.getElementById("main");
    
        const taskDeleteNoBtn = document.getElementById("task-delete-no");
        const taskDeleteYesBtn = document.getElementById("task-delete-yes");
        const taskDeleteMsg = document.getElementById("task-delete-message");
    
        let taskToDelete = null;
        let projectName = null;
    
        taskList.addEventListener('click', (e) => {
            const target = e.target;
            const svgTrashIcon = target.closest('#svg-trash-icon');
            if (svgTrashIcon) {
                const taskDiv = svgTrashIcon.closest('.task'); 
                const pDiv = taskDiv.querySelector("#task-title-p");
                const taskName = pDiv.innerHTML;
                projectName = document.getElementById("header-title").innerHTML;
    
                taskToDelete = Storage.getTodo().getProjectByName(projectName).getTaskByName(taskName);
    
                if (taskToDelete.status) {
                    taskDiv.remove();
                    Storage.deleteTask(projectName, taskToDelete.name);
                } else {
                    taskDeleteMsg.innerHTML = `You want to delete ${taskToDelete.name} from ${projectName}?`
                    taskDeleteSection.style.display = 'flex';
                    mainSection.style.filter = "blur(1px)";
                }
            }
        });
    
        taskDeleteYesBtn.addEventListener('click', () => {
            if (taskToDelete) {
                const taskDiv = document.getElementById(taskToDelete.name); 
                taskDiv.remove();
                Storage.deleteTask(projectName, taskToDelete.name);
    
                taskToDelete = null;
                projectName = null;
    
                taskDeleteSection.style.display = 'none';
                mainSection.style.filter = "none";
            }
        });
    
        taskDeleteNoBtn.addEventListener('click', () => {
            taskToDelete = null;
            projectName = null;
    
            taskDeleteSection.style.display = 'none';
            mainSection.style.filter = "none";
        });
    }

    static editTask() {
        const taskList = document.getElementById('task-list');
    
        const taskEditSection = document.getElementById("task-edit-section");
        const mainSection = document.getElementById("main");
    
        const editTaskBtn = document.getElementById("task-edit-btn");
        const cancelTaskBtn = document.getElementById("task-edit-cancel-btn");
    
        const taskEditFormError = document.getElementById("task-edit-form-error");
    
        const taskEditTitleInput = document.getElementById("task-edit-title");
        const taskEditDateInput  = document.getElementById("task-edit-date-input");
        const taskEditDescriptionInput = document.getElementById("task-edit-description");
    
        let taskToEdit = null;
        let projectName = null;
    
        taskList.addEventListener('click', (e) => {
            const target = e.target;
            const svgEditIcon = target.closest('#svg-edit-icon');
            if (svgEditIcon) {
                const taskDiv = svgEditIcon.closest('.task'); 
                const pDiv = taskDiv.querySelector("#task-title-p");
                const taskName = pDiv.innerHTML;
                projectName = document.getElementById("header-title").innerHTML;
                taskToEdit = Storage.getTodo().getProjectByName(projectName).getTaskByName(taskName);
    
                // Set the form values
                taskEditTitleInput.value = taskToEdit.name;
    
                const taskDate = new Date(taskToEdit.date);
                if (!isNaN(taskDate)) {
                    taskEditDateInput.value = taskDate.toISOString().substring(0, 10); // Convert date to YYYY-MM-DD format
                } else {
                    taskEditDateInput.value = ''; 
                }
    
                taskEditDescriptionInput.value = taskToEdit.description;
    
                taskEditSection.style.display = 'flex';
                mainSection.style.filter = "blur(1px)";
            }
        });
    
        cancelTaskBtn.addEventListener('click', function(e) {
            e.preventDefault();
            taskEditSection.style.display = 'none';
            mainSection.style.filter = "blur(0px)";
        });
    
        editTaskBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const newTaskTitle = taskEditTitleInput.value;
            const newTaskDate = taskEditDateInput.value;
            const newTaskDescription = taskEditDescriptionInput.value;
    
            const taskDiv = document.getElementById(taskToEdit.name)
            console.log(taskToEdit)

            taskToEdit.name = newTaskTitle;
            taskToEdit.date = newTaskDate;
            taskToEdit.description = newTaskDescription;
            taskToEdit.status = false

            console.log(taskToEdit);
            console.log(Storage.getTodo());
        });
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
            if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                const taskDiv = e.target.closest('.task');
                const pDiv = taskDiv.querySelector("#task-title-p");
                const taskName = pDiv.innerHTML;
    
                const projectName = document.getElementById("header-title").innerHTML;
                let actualProjectName = projectName;
    
                if (projectName === 'today' || projectName === 'this week') {
                    actualProjectName = taskDiv.getAttribute('data-project');
                }
    
                if (!e.target.checked) {
                    pDiv.style.textDecoration = "none";
                    pDiv.style.color = "rgba(31, 29, 27, 1)";
                    Storage.setTaskStatus(actualProjectName, taskName, false);
                } else {
                    pDiv.style.textDecoration = "line-through";
                    pDiv.style.color = "rgba(31, 29, 27, 0.2)";
                    Storage.setTaskStatus(actualProjectName, taskName, true);
                }
            }
        });
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
        const projectName = document.getElementById("header-title").innerHTML;
    
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('id', `${task.name}`);
    
        if (projectName === 'today' || projectName === 'this week') {
            taskDiv.setAttribute('data-project', task.project);
        }
    
        const taskInfoDiv = document.createElement('div');
        taskInfoDiv.setAttribute("id", "task-info");
    
        const taskInfoLeft = document.createElement('div');
        taskInfoLeft.setAttribute("id", "task-left");
    
        const taskLeftInput = document.createElement("INPUT");
        taskLeftInput.setAttribute("type", "checkbox");
        taskLeftInput.setAttribute("name", "status");
        taskLeftInput.setAttribute("id", "status");
    
        const taskLeftP = document.createElement('p');
        taskLeftP.setAttribute("id", "task-title-p");
        taskLeftP.innerHTML = `${task.name}`;
    
        if (task.status) {
            taskLeftP.style.textDecoration = "line-through";
            taskLeftP.style.color = "rgba(31, 29, 27, 0.2)";
            taskLeftInput.checked = true;
        } else {
            taskLeftP.style.textDecoration = "none";
            taskLeftP.style.color = "rgba(31, 29, 27, 1)";
            taskLeftInput.checked = false;
        }
    
        const taskInfoRight = document.createElement('div');
        taskInfoRight.setAttribute("id", "task-right");
    
        const taskRightDate = document.createElement("p");
        taskRightDate.setAttribute("id", "task-date");
        taskRightDate.innerHTML = `${task.getFormattedDate()}`;
    
        const taskRightBtn = document.createElement("BUTTON");
        taskRightBtn.setAttribute("type", "button");
        taskRightBtn.innerHTML = "Details";
    
        let svgEdit, svgDelete;
        if (projectName !== 'today' && projectName !== 'this week') {
            svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgEdit.setAttribute("viewBox", "0 0 24 24");
            svgEdit.setAttribute('id', 'svg-edit-icon');
            const titleEdit = document.createElementNS("http://www.w3.org/2000/svg", "title");
            titleEdit.textContent = "file-document-edit-outline";
            const pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEdit.setAttribute("d", "M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z");
            svgEdit.appendChild(titleEdit);
            svgEdit.appendChild(pathEdit);
    
            svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgDelete.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgDelete.setAttribute("viewBox", "0 0 24 24");
            svgDelete.setAttribute('id', 'svg-trash-icon')
            const titleDelete = document.createElementNS("http://www.w3.org/2000/svg", "title");
            titleDelete.textContent = "trash-can-outline";
            const pathDelete = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathDelete.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");
            svgDelete.appendChild(titleDelete);
            svgDelete.appendChild(pathDelete);
        }
    
        const taskDescriptionDiv = document.createElement("div");
        taskDescriptionDiv.setAttribute("id", "task-description-div");
    
        const taskDescriptionBorder = document.createElement('div');
    
        const taskDescriptionP = document.createElement("p");
        const taskDescriptionFrom = document.createElement("p");
        taskDescriptionFrom.classList.add('task-from-description');
    
        if (projectName === 'today' || projectName === 'this week') {
            taskDescriptionFrom.innerHTML = `Task FROM ${task.project}`;
            taskDescriptionP.innerHTML = `${task.description}`;
        } else {
            taskDescriptionP.innerHTML = `${task.description}`;
        }
    
        taskInfoLeft.appendChild(taskLeftInput);
        taskInfoLeft.appendChild(taskLeftP);
    
        taskInfoRight.appendChild(taskRightDate);
        taskInfoRight.appendChild(taskRightBtn);
        if (svgEdit) taskInfoRight.appendChild(svgEdit);
        if (svgDelete) taskInfoRight.appendChild(svgDelete);
    
        taskDescriptionDiv.appendChild(taskDescriptionBorder);
        taskDescriptionDiv.appendChild(taskDescriptionFrom);
        taskDescriptionDiv.appendChild(taskDescriptionP);
    
        taskInfoDiv.appendChild(taskInfoLeft);
        taskInfoDiv.appendChild(taskInfoRight);
    
        taskDiv.appendChild(taskInfoDiv);
        taskDiv.appendChild(taskDescriptionDiv);
    
        taskList.appendChild(taskDiv);
    }
    
    
    
}