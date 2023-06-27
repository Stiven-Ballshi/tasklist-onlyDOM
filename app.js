const form = document.querySelector("#task-form"); // add task btn
const taskList = document.querySelector(".collection"); // ul (list of task)
const clearBtn = document.querySelector(".clear-tasks"); //clear task btn
const filter = document.querySelector("#filter"); // task filter inoput
const taskInput = document.querySelector("#task"); // input for task

loadEventListeners();

function loadEventListeners() {
  window.addEventListener("DOMContentLoaded", loadFromLS);

  form.addEventListener("submit", handleSubmit);

  clearBtn.addEventListener("click", handleClearAll);

  taskList.addEventListener("click", removeTask);

  filter.addEventListener("keyup", filterTask);
}

function loadFromLS() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  if (taskInput.value === "") {
    alert("Type something");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  addToLS(taskInput.value);

  taskInput.value = "";
}

function removeFromLS(element) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task, index) => {
    if (element.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addToLS(task) {
  // Logic to add task into an array in local storage

  // Step 1 retrieve the array first from local storage and if doesn't exist make it an empty array

  // Step 2 After retrieving , add the new task with .push

  // Step 3 Set the array in local storage

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleClearAll() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);

    localStorage.clear();
  }
}

function removeTask(event) {
  if (event.target.parentElement.classList.contains("delete-item")) {
    event.target.parentElement.parentElement.remove();

    removeFromLS(event.target.parentElement.parentElement);
  }
}

function filterTask(event) {
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const searchQuery = event.target.value.toLowerCase();

    if (task.textContent.includes(searchQuery)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
