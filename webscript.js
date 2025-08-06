window.onload = function () {
  loadTasks();

  // Enter key support
  const input = document.getElementById("taskInput");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
};

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDate");
  const taskText = input.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    date: taskDate,
    done: false
  };

  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  dateInput.value = "";
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  renderTasks();
}

function toggleDone(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const formattedDate = task.date ? `<small>📅 ${task.date}</small>` : "";

    li.innerHTML = `
      <div>
        <span onclick="toggleDone(${index})">${task.text}</span><br/>
        ${formattedDate}
      </div>
      <span class="delete-btn" onclick="deleteTask(${index})">✖</span>
    `;

    taskList.appendChild(li);
  });
}
