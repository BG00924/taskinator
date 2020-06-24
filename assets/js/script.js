// creats a variable that selects/applies toS the element with the #task-form id.  
// I thenk it makes it an object to or either only affects it as an object
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//Replaced by the following functions
//buttonEl.addEventListener("click", function() {
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = "This is a new task.";
    //tasksToDoEl.appendChild(listItemEl);
//})

var createTaskHandler = function() {
    // prevents automatic refresh of the page
    event.preventDefault();
    // creates the li
    var listItemEl = document.createElement("li");
    // applies task-item css style
    listItemEl.className = "task-item";
    // add text inside the lo
    listItemEl.textContent = "This is a new task.";
    // applies the li to at the end of the element/container
    tasksToDoEl.appendChild(listItemEl);

};

//event listener to call createTaskHandler function
formEl.addEventListener("submit", createTaskHandler);