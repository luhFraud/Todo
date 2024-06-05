import UI from "./ui";

import { Todo } from "./todo";
import '../dist/style.css';


const todo = new Todo();

console.log("style is linked");

document.addEventListener("DOMContentLoaded", UI.loadPage)