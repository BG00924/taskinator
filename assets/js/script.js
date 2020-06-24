// creats a variable that selects/applies toS the element with the #task-form id.  
// I thenk it makes it an object to or either only affects it as an object
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// var to enable us to assign unique ids
var taskIdCounter = 0;


//Replaced by the following functions
//buttonEl.addEventListener("click", function() {
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = "This is a new task.";
    //tasksToDoEl.appendChild(listItemEl);
//})

var taskFormHandler = function(event) {
    // prevents automatic refresh of the page
    event.preventDefault();
    // var for task input field speifically selecting and storing value
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // variable declaration for drop down menu input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // stops function if fields are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };
    formEl.reset();
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
    // adds task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //creat div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // gives the div a class name
    taskInfoEl.className = "task-info";
    // adds html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // add text inside the lo
    // listItemEl.textContent = "This is a new task.";
    // adjusted from about to pull the var taskNameInput which selected and stored the value input into the field
    //listItemEl.textContent = taskNameInput;
    // adds content to the div inside of the li and appends it to the li
    listItemEl.appendChild(taskInfoEl);
    //creates buttons that correspond to current task
    var taskActionsEl = createTaskActions(taskIdCounter);
    // appends buttons to listItemEl before appended to page
    listItemEl.appendChild(taskActionsEl);
    // appends the entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // increases task counter for next unique id
    taskIdCounter++;
};
// function to dynamically create the buttons for each task
var createTaskActions = function(taskId) {
    // creates new div with a class
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // creates edit buttion
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    //appends the edit button to the above div
    actionContainerEl.appendChild(editButtonEl);
    //creates delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    //appends the buttons to the above div in this function
    actionContainerEl.appendChild(deleteButtonEl);
    //adds the drop down menu for the items
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    //appends button
    actionContainerEl.appendChild(statusSelectEl);
    //var to set loop for select drop down options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    //array declaration for the select drop down
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    //used to verify correct data is returned
    return actionContainerEl;
}

//event listener to call taskFormHandler function
formEl.addEventListener("submit", taskFormHandler);