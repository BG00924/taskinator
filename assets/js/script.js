var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//Replaced by the following functions
//buttonEl.addEventListener("click", function() {
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = "This is a new task.";
    //tasksToDoEl.appendChild(listItemEl);
//})

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

//event listener to call createTaskHandler function
buttonEl.addEventListener("click", createTaskHandler);