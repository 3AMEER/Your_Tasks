let input = document.querySelector(".input")
let submit = document.querySelector(".submit")
let tasks = document.querySelector(".tasks")

let arrayOfTasks = [];

// Check if Tasks In Local Storage
if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

// Add Taske
submit.onclick = function ()  {

    if (input.value !== "") {
        addTaskToArray(input.value)
        input.value = ""
    }
}

// Click On Tasks Element
tasks.addEventListener('click', (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Tasks From Local Storage
        deleteTasksWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove()
    }

    // Task Element
    if(e.target.classList.contains("task")) {
        // Toggle Complated For The Task
        toggleStuatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskText) {
    // Tasks Data
    const task = {
        id: Date.now(),
        title: taskText,
        complated: false
    }
    arrayOfTasks.push(task)
    // Add Task To Page
    addTaskTopagefrom(arrayOfTasks)
    // Add tasks to local Storage
    addDataToLocakStorageFrom(arrayOfTasks)
}


function addTaskTopagefrom(arrayOfTasks){
    // Empty Tasks Div
    tasks.innerHTML = ""

    // Looping On Array of Tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task"

        // Check if task is Complated
        if (task.complated === true) {
            div.className = "task done"
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // craet btn Delete
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasks.appendChild(div)
    });
};

function addDataToLocakStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");

    if (data) {
        let tasks = JSON.parse(data);
        addTaskTopagefrom(tasks)
    }
} 
getDataFromLocalStorage()

function deleteTasksWith(taskId) {
    // For Explane Only
    // for(let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocakStorageFrom(arrayOfTasks)
}

function toggleStuatusTaskWith(taskId) {
    for(let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id  == taskId) {
            arrayOfTasks[i].complated === false ? (arrayOfTasks[i].complated = true) : (arrayOfTasks[i].complated = false)
        }
    }
    addDataToLocakStorageFrom(arrayOfTasks)
}