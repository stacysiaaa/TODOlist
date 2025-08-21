let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

const elements = {
    inputText: document.querySelector(".input-text"),
    addBtn: document.querySelector(".btn-input-group"),
    inputTitle: document.querySelector(".input-title"),
    saveBtn: document.querySelector(".btn-save"),
    taskList: document.querySelector(".task-list"),
    prioritySort: document.querySelector(".priority-sort"),
    toggle: document.getElementById("theme-toggle"),
    container: document.querySelector(".container"),
    prioritySelect: document.querySelector(".priority-select")
}


function init() {
    renderTasks();
    elements.addBtn.addEventListener("click", addTask);
    elements.inputText.addEventListener("keydown", (event) => {
        if (event.key === "Enter") addTask();
    });
    elements.saveBtn.addEventListener("click", saveEdit);
    changeBorder(elements.inputTitle);
    changeBorder(elements.inputText);
}

function renderTasks(list = tasks) {
    elements.taskList.innerHTML = "";

    list.forEach((task, index) => {
        const li = document.createElement("li");

        const priority = document.createElement("span");
        priority.textContent = task.priority;
        priority.classList.add("task-priority");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
        if (task.completed) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasksToLocalStorage();
            renderTasks();
        });

        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;
        titleSpan.classList.add("task-title");

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        textSpan.classList.add("task-text");

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Remove";
        btnRemove.classList.add("btn-delete");
        btnRemove.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
            saveTasksToLocalStorage();
        });

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", () => {
            elements.inputTitle.value = task.title;
            elements.inputText.value = task.text;
            editIndex = index;
        });

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
    return elements.inputText.value.trim() !== "" && elements.inputTitle.value.trim() !== "";
}

function addTask() {
    if (!isValidInput()) return;

    let taskPriority = elements.prioritySelect.value;

    tasks.push({
        title: elements.inputTitle.value.trim(),
        text: elements.inputText.value.trim(),
        priority: taskPriority,
        completed: false,
    });

    elements.inputTitle.value = "";
    elements.inputText.value = "";
    saveTasksToLocalStorage();
    renderTasks();
}

function saveEdit() {
    if (editIndex !== null) {
        let taskPriority = elements.prioritySelect.value;


        const updatedTask = {
            ...tasks[editIndex],
            title: elements.inputTitle.value,
            text: elements.inputText.value,
            priority: taskPriority

        };

        tasks.splice(editIndex, 1, updatedTask);

        elements.inputTitle.value = "";
        elements.inputText.value = "";
        editIndex = null;

        saveTasksToLocalStorage();
        renderTasks();
    }
}

function sortTasks() {
    let selectedPriority = document.querySelector(".priority-sort").value;

    if (!selectedPriority) {
        renderTasks(tasks);
        return;
    }

    let sortedTasks = tasks.filter(task => task.priority === selectedPriority);
    let others = tasks.filter(task => task.priority !== selectedPriority);

    renderTasks([...sortedTasks, ...others]);
}

let prioritySortBtn = document.querySelector(".priority-sort");
prioritySortBtn.addEventListener("change", sortTasks);


function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeBorder(element) {
    element.addEventListener("focus", () => element.classList.add("border-pink"));
    element.addEventListener("blur", () => element.classList.remove("border-pink"));
}

if (localStorage.getItem("theme") === "dark") {
    elements.container.classList.add("dark");
    elements.toggle.checked = true;
}

elements.toggle.addEventListener("change", () => {
    elements.container.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        elements.container.classList.contains("dark") ? "dark" : "light"
    );
});


init();
