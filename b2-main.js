let routines = [];
loadRoutines();

/*
if (localStorage.getItem("routines")) {
    routines = JSON.parse(localStorage.getItem("routines"))
    //loadRoutines();
}*/

function saveRoutines(routine) {    
    localStorage.setItem('routines', JSON.stringify(routine));
}

function loadRoutines() {
    routines = document.getElementById("menu");
    routines.innerHTML = JSON.parse(localStorage.getItem("routines"));
}



// Accordion

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", accordionSlide);
}

function accordionSlide() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
}



// Action Button

let actionButton = document.getElementById("action");
actionButton.addEventListener("click", showHide);
let actionButtonToggle = true;

let newRoutineTitle = document.querySelector("#routineTitleInput");
let newRoutineForm = document.getElementById("newRoutineForm");

function showHide() {
    newRoutineForm.classList.toggle("hidden");
    actionButton.classList.toggle("hideForm");
    newRoutineTitle.classList.remove("validate");
    
    if (actionButtonToggle) {
        actionButton.innerHTML = `<i class="fas fa-times" aria-hidden="true"></i>`;
        actionButtonToggle = false;
    } else {
        actionButton.innerHTML = `<i class="fas fa-plus" aria-hidden="true"></i>`;
        actionButtonToggle = true;
    }
}

let addRoutineButton = document.getElementById("addRoutineButton");
addRoutineButton.addEventListener("click", addNew);


function addNew() {    
    let newRoutineTitle = document.querySelector("#routineTitleInput");
    let newRoutineBody = Array.from(document.getElementsByClassName("routineBodyInput"));
    
    console.log(newRoutineBody);
    
    if(newRoutineTitle.value) {
        let routinesMenu = document.getElementById("menu");
        let node = document.createElement("LI");
        let newItem = routinesMenu.appendChild(node);
        let invalid;

        /*
        newRoutineBody.forEach(buildRoutine);

        function buildRoutine(item) {
            let routine = item.value;
            console.log(routine);
        }
        */
        
        let exercises = `<li>${newRoutineBody[0].value}</li>` + `<li>${newRoutineBody[1].value}</li>` + `<li>${newRoutineBody[2].value}</li>` + `<li>${newRoutineBody[3].value}</li>` + `<li>${newRoutineBody[4].value}</li>`;

        console.log(exercises);
        
        newItem.innerHTML = `<a class="accordion" href="#">${newRoutineTitle.value}</a><div class="panel"><ul>${exercises}</ul></div><button class="actionDelete"><i class="far fa-trash-alt"></i></button>`;
        newItem.firstElementChild.addEventListener("click", accordionSlide);
        newItem.querySelector(".actionDelete").addEventListener("click", deleteItem);

        routines = document.getElementById("menu").innerHTML;    
        saveRoutines(routines);

        document.querySelector("#routineTitleInput").value = "";
        
        newRoutineBody.forEach(clear);
        function clear(item) {
            item.value = "";
        }
        
        showHide();
    } else {
        newRoutineTitle.classList.toggle("validate");
    }
}



let delButtons = document.getElementsByClassName("actionDelete");

for (i = 0; i < delButtons.length; i++) {
  delButtons[i].addEventListener("click", deleteItem);
}

function deleteItem() {    
    let parent = this.parentElement;    
    parent.parentNode.removeChild(parent);
    
    routines = document.getElementById("menu").innerHTML;
    saveRoutines(routines);
}


















