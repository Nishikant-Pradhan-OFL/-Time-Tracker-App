let startTime, interval;
let taskList = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const taskNameInput = document.getElementById("taskName");
const timerDisplay = document.getElementById("timer");
const taskListElement = document.getElementById("taskList");

function formatTime(duration) 
{
  const hrs = String(Math.floor(duration / 3600)).padStart(2, "0");
  const mins = String(Math.floor((duration % 3600) / 60)).padStart(2, "0");
  const secs = String(duration % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

startBtn.addEventListener("click", () => {
  if (taskNameInput.value.trim() === "") 
  {
    alert("Please enter a task name.");
    return;
  }

  startTime = Date.now();
  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsed);
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  taskList.push({
    name: taskNameInput.value,
    duration: formatTime(elapsed),
  });

  updateTaskList();

  taskNameInput.value = "";
  timerDisplay.textContent = "00:00:00";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function updateTaskList() 
{
  taskListElement.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${task.name} - ${task.duration}`;
    taskListElement.appendChild(li);
  });
}

function saveTasks() 
{
  localStorage.setItem("timeTrackerTasks", JSON.stringify(taskList));
}

function loadTasks() 
{
  const saved = localStorage.getItem("timeTrackerTasks");
  if (saved) {
    taskList = JSON.parse(saved);
    updateTaskList();
  }
}

function updateTaskList() 
{
  taskListElement.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${task.name} - ${task.duration}`;
    taskListElement.appendChild(li);
  });
  saveTasks();
}

window.addEventListener("load", loadTasks);

document.getElementById("exportBtn").addEventListener("click", () => {
  const text = taskList.map(t => `${t.name}: ${t.duration}`).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "time-tracker-tasks.txt";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Clear all tasks?")) 
  {
    taskList = [];
    updateTaskList();
    localStorage.removeItem("timeTrackerTasks");
  }
});
