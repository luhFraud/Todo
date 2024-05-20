import { Project } from "./project";
import { Task } from "./task";

const task = new Task("Finish Task Objects", "Check if eveything works");
const task2 = new Task("Date Function for task", "Check how the date format works for task", "2024-05-31");
const task3 = new Task("This Week Tass", "Should get this week tasks", "2024-05-21");
const project = new Project("Test Project", [task, task2, task3]);

console.log(project.list);
console.log(project.getTodaysTasks());
console.log(project.getThisWeeksTasks());