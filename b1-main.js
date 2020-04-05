import { qs } from 'b1-ToDos.js';
import ToDos from 'b1-ToDos.js';
let myVar = 3;

const myToDos = new ToDos(qs('#taskList'), 'todo');

console.log(myToDos.key);