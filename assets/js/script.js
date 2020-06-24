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

var taskFormHandler = function() {
    // prevents automatic refresh of the page
    event.preventDefault();
    // var for task input field speifically selecting and storing value
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // variable declaration for drop down menu input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an argument to 
    createTaskEl(taskDataObj);
};
//relocated all interior code from taskFormHandler()
var createTaskEl = function(taskDataObj) {
    // creates the li
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"; //applies the task-item class to each created li
    //creat div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // gives the div a class name
    taskInfoEl.className = "task-info";
    // adds html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObject.name + "</h3><span class='task-type'>" + taskDataObject.type + "</span>";
    // add text inside the lo
    // listItemEl.textContent = "This is a new task.";
    // adjusted from about to pull the var taskNameInput which selected and stored the value input into the field
    //listItemEl.textContent = taskNameInput;
    // adds content to the div inside of the li and appends it to the li
    listItemEl.appendChild(taskInfoEl);
    // appends the entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

//event listener to call taskFormHandler function
formEl.addEventListener("submit", taskFormHandler);