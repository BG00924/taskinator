// creats a variable that selects/applies toS the element with the #task-form id.  
// I thenk it makes it an object to or either only affects it as an object
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
// var to enable us to assign unique ids
var taskIdCounter = 0;
// var to apply the delete function to <main>
var pageContentEl = document.querySelector("#page-content");
// variables to reference last two columsn
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


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
    // checks to see if it has an id to know if it should be saved
    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else { 
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        //send it as an argument to 
        createTaskEl(taskDataObj);
    }
};
//relocated all interior code from taskFormHandler()
var createTaskEl = function(taskDataObj) {
    // creates the li
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"; //applies the task-item class to each created li
    // adds task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // adds draggable attribute
    listItemEl.setAttribute("draggable", "true");
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

// taskbuttonhandler function
var taskButtonHandler = function(event) {
    //console.log(event.target);
    // get target element from event
    var targetEl = event.target
    // utilized the match method to return a true if it matches
    //if (event.target.matches(".delete-btn")) {
        // get the element's task id
        //var taskId = event.target.getAttribute("data-task-id");
        //console.log(taskId);
        //deleteTask(taskId);
    //}
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId= targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    
};

// function to delete using taskId as parameter
var deleteTask = function(taskId) {
    //console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //console.log(taskSelected);
    taskSelected.remove();
};

var editTask = function(taskId) {
    console.log("editing task#" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    // keeps track of the id
    formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    //returns button to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

var taskStatusChangeHandler = function(event) {
    //event.target.getAttribute("data-task-id");
    //console.log(event.target);
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

var dragTaskHandler = function(event) {
    //console.log("event.target:", event.target); 
    //console.log("event.type:", event.type);
    //console.log("event", event);
    var taskId = event.target.getAttribute("data-task-id");
    //console.log("Task ID:", taskId);
    //stores data in the objects 
    event.dataTransfer.setData("text/plain", taskId);
    // retrieves the data to verify it got stored
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
};

var dropZoneDragHandler = function(even) {
    //console.log("Dragover Event Target:", event.target); 
    // allows for the object to be dropped in different elements
    //event.preventDefault();
    // targets the task list and returns the DOM element using bottom to top search
    //event.target.closest(".task-list");
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        // used to verify working
        //console.dir(taskListEl);

    }
};

var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    //console.log("Drop Event TRaget:", event.target, event.dataTransfer, id);
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //console.log(draggableElement);
    //console.dir(draggableElement);
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    //console.log(statusType);
    //console.dir(dropZoneEl);
    //set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    //console.dir(statusSelectEl);
    //console.log(statusSelectEl);
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);
}

// event listener for button
pageContentEl.addEventListener("click", taskButtonHandler);

//event listener to call taskFormHandler function
formEl.addEventListener("submit", taskFormHandler);

// event listener that registers any change in value
pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

// event listener that applies dragover
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// event listener for the drop
pageContentEl.addEventListener("drop", dropTaskHandler);


