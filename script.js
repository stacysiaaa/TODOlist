let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTask();
let inputText = document.querySelector(".input-text");
let addBtn = document.querySelector(".btn-input-group");
let inputTitle = document.querySelector(".input-title");
let saveBtn = document.querySelector(".btn-save");

function renderTask() {
    let taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

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
            saveTasks();
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
            renderTask();
            saveTasks();
        });

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.classList.add("btn-edit");
        btnEdit.addEventListener("click", function () {
            inputText.value = task.text;
            inputTitle.value = task.title;
        })

        li.appendChild(checkbox);
        li.appendChild(priority);
        li.appendChild(titleSpan);
        li.appendChild(textSpan);
        li.appendChild(btnRemove);
        li.appendChild(btnEdit);

        taskList.appendChild(li);
    });
}



function addTask() {
    let taskText = inputText.value.trim();
    let taskTitle = inputTitle.value.trim();
    let taskPriority=document.querySelector(".priority-select").value;


    if (taskText !== "" && taskTitle !== "") {
        tasks.push(
            {title: taskTitle,
                text: taskText,
                priority:taskPriority,
                completed: false,

            });
        renderTask();
        inputText.value = "";
        inputTitle.value = "";
        saveTasks();
    }
}

addBtn.addEventListener("click", addTask);
inputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeBorder(element) {
    element.addEventListener("focus", () => element.classList.add("border-pink"))
    element.addEventListener("blur", () => element.classList.remove("border-pink"))
}

changeBorder(inputTitle);
changeBorder(inputText);