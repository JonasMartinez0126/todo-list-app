// Variables de elementos del DOM
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");
// Copia general de las tareas
let allTasks = [];
// funciones al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  setDate();
  loadTasks();
});
// Carga las tareas al inicio
async function loadTasks() {
  const response = await fetch("/tareas");
  const tasks = await response.json();

  allTasks = [...tasks];

  tasks.forEach((task) => {
    createStructureTask(task);
  });
}
// fecha actual
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};
// función para agregar una nueva tarea
const addNewTask = async (e) => {
  e.preventDefault();
  const { value } = e.target.taskText;
  if (!value) return;

  // Enviar la tarea al backend
  const result = await fetch("/tareas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo: value }),
  });

  const savedTask = await result.json();

  // Agregar la tarea a la copia local
  allTasks = [...allTasks, savedTask];

  createStructureTask(savedTask);

  // Limpiar el formulario
  e.target.reset();
};
// funcion para actualizar el estado de una tarea
const changeTaskState = async (event) => {
  const taskDiv = event.target;
  const id = taskDiv.dataset.id;
  if (!id) return;

  // Cambiar estado visual
  taskDiv.classList.toggle("done");

  const task = allTasks.find((t) => t._id === id);
  if (!task) return;

  // Cambiar el estado
  const nuevoEstado = !task.estado;

  // Actualizar en backend
  await fetch(`/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  // Actualizar la copia local
  task.estado = nuevoEstado;
};
// funcion para crear la estructura de una tarea
const createStructureTask = (task) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task", "roundBorder");
  taskContainer.dataset.id = task._id;
  taskContainer.addEventListener("click", changeTaskState);

  // Contenedor para título y descripción
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";

  // Título
  const title = document.createElement("span");
  title.classList.add("title-task");
  title.textContent = task.titulo;
  title.style.fontWeight = "bold";
  content.appendChild(title);

  // Descripción
  const desc = document.createElement("p");
  desc.classList.add("desc-task");
  desc.textContent = task.descripcion || "";
  desc.style.margin = "4px 0 0 0";
  desc.style.fontSize = "0.9em";
  desc.style.color = "#fff";
  content.appendChild(desc);

  taskContainer.appendChild(content);

  if (task.estado) {
    taskContainer.classList.add("done");
  }

  // Botón de eliminar
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const id = task._id;
    await fetch(`/tareas/${id}`, { method: "DELETE" });
    taskContainer.remove();
    allTasks = allTasks.filter((t) => t._id !== id);
  });

  taskContainer.appendChild(deleteBtn);
  tasksContainer.appendChild(taskContainer);
};
// Función para ordenar las tareas
const orderTasks = () => {
  // Ordenar allTasks: primero las hechas (estado: true), luego las no hechas
  allTasks.sort((a, b) => {
    if (a.estado === b.estado) return 0;
    return a.estado ? -1 : 1;
  });

  // Limpiar el contenedor
  clearHTML();

  // Renderizar las tareas ordenadas
  allTasks.forEach((task) => {
    createStructureTask(task);
  });
};
// limpiar el contenedor de tareas
const clearHTML = () => {
  while (tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild);
  }
};
