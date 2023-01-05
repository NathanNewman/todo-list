// Global variables
const form = document.querySelector("#inputTask");
const input = document.querySelector("#toDo");
const toDoList = document.querySelector("#list");

// load from localStorage
const savedTasks = JSON.parse(localStorage.getItem("toDos")) || [];
for (let i = 0; i < savedTasks.length; i++) {
  const newTask = document.createElement("li");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "X";
  newTask.innerText = savedTasks[i].task.slice(0, -1);
  newTask.appendChild(removeBtn);
  newTask.isCompleted = savedTasks[i].isCompleted ? true : false;
  toDoList.appendChild(newTask);
  if (newTask.isCompleted) {
    newTask.style.textDecoration = "line-through";
  }
}

// add task
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = document.createElement("li");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "X";
  newTask.innerText = input.value;
  newTask.appendChild(removeBtn);
  newTask.isComplete = false;
  input.value = "";
  toDoList.appendChild(newTask);

  // save to localStorage
  savedTasks.push({ task: newTask.innerText, isComplete: false });
  localStorage.setItem("toDos", JSON.stringify(savedTasks));
});

// cross off and/or remove items from list
toDoList.addEventListener("click", function (e) {
  let clickedListItem = e.target;

  if (!clickedListItem.isComplete) {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isComplete = true;
  } else {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isComplete = false;
  }
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }

  // save to localStorage
  for (let i = 0; i < savedTasks.length; i++) {
    if (savedTasks[i].task === clickedListItem.innerText) {
      savedTasks[i].isCompleted = clickedListItem.isCompleted;
      localStorage.setItem("toDos", JSON.stringify(savedTasks));
    }
  }
});

// adds autocomplete function to input text

const taskArray = ["Dinner", "Laundry", "Lunch", "Mow", "Homework", "Study", "Breakfast", "Clean"];

input.addEventListener("input", function (e) {
  const input = e.target;
  const text = input.value;

  if (text.length > 0) {
    let newText = "";
    for (let task of taskArray) {
      if (task.startsWith(text)) {
        newText = task.slice(text.length, task.length);
      }
    }
    if (newText) {
      completeText = text + newText;
      input.value = completeText;
      input.setSelectionRange(text.length, completeText.length);
    }
  }
});