import UI from "./ui";

import { Todo } from "./todo";
import '../dist/style.css'

const todo = new Todo();

console.log("i");

document.addEventListener("DOMContentLoaded", UI.loadPage)