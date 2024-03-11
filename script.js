const taskInput = document.getElementById("input-box");
var taskList = document.getElementById("list-container");

var taskArray = [];

function addTask() {
    const taskText = taskInput.value.trim().toUpperCase();
    if(taskText === ""){
        alert("Input the task name");
    }
    else  {
        const task = {
            id: taskArray.length,
            taskName: taskText,
            isCompleted: false,
        };    
        taskArray.push(task);
        taskInput.value = "";
        console.log("Task " + task.id + " " + task.taskName + " is added");
        renderList(taskArray);
    }
}

function renderList(filteredTasks){   
  taskList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
  var li = document.createElement("li");            
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.isCompleted;
  checkbox.addEventListener("change",()=>{
      taskArray[index].isCompleted = checkbox.checked;
      console.log("Task " + task.id + " " + task.taskName + " is " + task.isCompleted);
  })

  const deleteButton = document.createElement("button", id="button-delete");
  deleteButton.textContent = "Delete";
  deleteButton.className = "button-delete";
  deleteButton.addEventListener("click", () => {
      taskArray.splice(index, 1);
      renderList(filteredTasks);
  })
         
  const editButton = document.createElement("button", id="button-edit" );
  editButton.textContent = ("Edit");
  editButton.className = "button-edit";
  editButton.addEventListener('click', () => {
      editTask(index);
    });
  li.textContent.className = "ul-text";
  li.textContent = task.taskName;
  li.appendChild(checkbox);
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  taskList.appendChild(li);
});
}

function editTask(id) {
  const newTaskName = prompt('Enter new task name:');
  if (newTaskName !== null) {
    taskArray[id].taskName = newTaskName.trim().toUpperCase();
    renderList(taskArray);
  }
}


function filterTasks() {
  const filterAll = document.getElementById('filterAll').checked;
  const filterCompleted = document.getElementById('filterCompleted').checked;
  const filterUncompleted = document.getElementById('filterUncompleted').checked;

  if (filterAll) {
    renderList(taskArray);
  } else if (filterCompleted) {
    const completedTasks = taskArray.filter(task => task.isCompleted);
    renderList(completedTasks);
  } else if (filterUncompleted) {
    const uncompletedTasks = taskArray.filter(task => !task.isCompleted);
    renderList(uncompletedTasks);
  }
}