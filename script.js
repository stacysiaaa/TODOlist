let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const elements = {
    inputText: document.querySelector(".input-text"),
    addBtn: document.querySelector(".btn-input-group"),
    inputTitle: document.querySelector(".input-title"),
    saveBtn: document.querySelector(".btn-save"),
    taskList: document.querySelector(".task-list"),
}

function init() {
    renderTasks();
    elements.addBtn.addEventListener("click", addTask);
    elements.inputText.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
    changeBorder(elements.inputTitle);
    changeBorder(elements.inputText);
}

function renderTasks() {
    elements.taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const priority = document.createElement("span");
        priority.textContent = task.priority;
        priority.classList.add("task-priority");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasksToLocalStorage();
        });


        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;
        titleSpan.classList.add("task-title");

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        textSpan.classList.add("task-text");

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("task-btn-container");

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Remove";
        btnRemove.classList.add("btn-delete");
        btnRemove.addEventListener("click", function () {
            tasks.splice(index, 1);
            renderTasks();
            saveTasksToLocalStorage();
        })

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", function () {
            elements.inputText.value = task.text;
            elements.inputTitle.value = task.title;
        })

        li.appendChild(checkbox);
        li.appendChild(priority);
        li.appendChild(titleSpan);
        li.appendChild(textSpan);
        li.appendChild(btnRemove);
        li.appendChild(btnEdit);

        elements.taskList.appendChild(li);
    });
}

function isValidInput() {
    let taskText = elements.inputText.value.trim();
    let taskTitle = elements.inputTitle.value.trim();
    return taskText !== "" && taskTitle !== "";
}

function addTask() {
    if (!isValidInput()) return

    let taskPriority = document.querySelector(".priority-select").value;


    tasks.push(
        {
            title: elements.inputTitle.value.trim(),
            text: elements.inputText.value.trim(),
            priority: taskPriority,
            completed: false,

        });
    renderTasks();
    elements.inputText.value = "";
    elements.inputTitle.value = "";
    saveTasksToLocalStorage();
}


function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeBorder(element) {
    element.addEventListener("focus", () => element.classList.add("border-pink"))
    element.addEventListener("blur", () => element.classList.remove("border-pink"))
}

init();
