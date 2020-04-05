let liveToDos = null;
// helper function...just a wrapper for document.querySelector


// example of a named export...normally I wouldn't do named and default exports from the same module...here it for example
export function qs(selectorName) {
  return document.querySelector(selectorName);
}

export function qsa(selectorName) {
  return document.querySelectorAll(selectorName);
}

function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

function writeToLS(key) {
  localStorage.setItem(key, JSON.stringify(liveToDos));
}

function getToDos(key) {
  if (liveToDos === null) {
    //if liveToDos is still null we need to read the list from localstorage
    liveToDos = readFromLS(key) || []; // the or (||) at the end says if read doesn't return anything (no tasks have been saved yet) set liveToDos to an empty array
  }
  return liveToDos;
}

function saveToDo(task, key) {
  const todo = {
    id: new Date(),
    task: task,
    completed: false
  };
  
    // add the new task to our list
  liveToDos.push(todo);
  
    // Save it to local storage
  writeToLS(key);
}



document.getElementById("deleteButton").addEventListener("click", function deleteToDo(key) {
    console.log(key);
    
    key = liveToDos.length - 1;
  
    // add the new task to our list
    liveToDos.splice(key,1);
  
    //console.log(liveToDos);
    
    const element = document.getElementById("taskList");
    
    renderToDoList(liveToDos, element);
    
    // Save it to local storage
    writeToLS(key);
});




function renderToDoList(list, element) {
  element.innerHTML = '';

  list.forEach(toDo => {
    const item = document.createElement('li');
    const formattedDate = new Date(toDo.id).toLocaleDateString('en-US');

    item.innerHTML = `<input class="completeButton" type="checkbox"><label>${toDo.task}</label><button>X</button>`;
    element.appendChild(item);
  });
}

// uses a touchend for mobile devices and falls back to a click event for desktop
function bindTouch(element, callback) {
  element.addEventListener('touchend', event => {
    event.preventDefault();
    callback();
  });
  element.addEventListener('click', callback);
}

class ToDos {
  constructor(listElement, key) {
    this.listElement = listElement;
    this.key = key;
    // attach the add method to our add button
    bindTouch(qs('#addButton'), this.addToDo.bind(this));
      
    this.listToDos();
  }
  addToDo() {
    const input = qs('#taskInput');
    saveToDo(input.value, this.key);
    input.value = ''; //Clear the input out to get ready for the next task
    this.listToDos();
  }
  completeToDo() {
    /*const input = qs('#taskInput');
    saveToDo(input.value, this.key);
    input.value = ''; //Clear the input out to get ready for the next task
    this.listToDos();*/
  }
  listToDos() {
    renderToDoList(getToDos(this.key), this.listElement);
      
    const completeButtons = Array.from(qsa('.completeButton'));
    completeButtons.forEach(bindComplete);
      
    function bindComplete(){
        // attach the complete method to our check button
        //bindTouch('.completeButton', this.completeToDo.bind(this));
    }
  }
}
// this makes only the class accessible outside the module...everything else will be private.
export default ToDos;