import './style.css'; 
import UI from "./ui";
import { Todo } from "./todo";

const todo = new Todo();

console.log("Style is in");

document.addEventListener("DOMContentLoaded", UI.loadPage);
