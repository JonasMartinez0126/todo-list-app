// Variables de elementos del DOM
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");

// Contenedor de tareas
const tasksContainer = document.getElementById("tasksContainer");

// Copia general de las tareas
let allTasks = [];

// Al cargar el documento, inicializa la fecha y carga las tareas
document.addEventListener("DOMContentLoaded", () => {
  setDate();
  loadTasks();
});

// Carga las tareas desde el backend y las muestra en pantalla
async function loadTasks() {
  const response = await fetch("/tareas");
  const tasks = await response.json();

  allTasks = [...tasks];

  tasks.forEach((task) => {
    createStructureTask(task);
  });
}

// Establece la fecha actual en el encabezado
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateText.textContent = date.toLocaleString("es", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

// Función para agregar una nueva tarea
const addNewTask = async (e) => {
  e.preventDefault();
  const { value } = e.target.taskText;
  if (!value || !value.trim()) {
    alert("El título es requerido.");
    return;
  }

  // Enviar la tarea al backend
  const result = await fetch("/tareas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo: value }),
  });

  const savedTask = await result.json();

  // Agregar la tarea a la copia local y mostrarla
  allTasks = [...allTasks, savedTask];
  createStructureTask(savedTask);

  // Limpiar el formulario
  e.target.reset();
};

// Cambia el estado (hecha/no hecha) de una tarea al hacer click
const changeTaskState = async (event) => {
  const taskDiv = event.target;
  const id = taskDiv.dataset.id;
  if (!id) return;

  // Cambiar estado visual
  taskDiv.classList.toggle("done");

  // Buscar la tarea en la copia local
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

// Permite actualizar el título y descripción de una tarea con clic derecho
const updateTask = async (e) => {
  e.preventDefault();
  const taskDiv = event.target;
  const id = taskDiv.dataset.id;
  if (!id) return;
  const taskObtenido = allTasks.find((t) => t._id === id);
  if (!taskObtenido) return;
  
  // Solicita nuevo título
  const nuevoTitulo = window.prompt("Nuevo título:", taskObtenido.titulo);
  if (nuevoTitulo === null) return; 
  if (!nuevoTitulo.trim()) {
    alert("El título es requerido.");
    return;
  }
  // Solicita nueva descripción
  const nuevaDescripcion = window.prompt("Nueva descripción:", taskObtenido.descripcion || "");
  if (nuevaDescripcion === null) return; 

  // Actualizar en backend
  await fetch(`/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo: nuevoTitulo, descripcion: nuevaDescripcion }),
  });

  // Actualizar en la copia local
  taskObtenido.titulo = nuevoTitulo;
  taskObtenido.descripcion = nuevaDescripcion;

  // Actualizar visualmente
  clearHTML();
  // Renderizar las tareas
  allTasks.forEach((task) => {
    createStructureTask(task);
  });
}

// Crea la estructura HTML de una tarea y la agrega al contenedor
const createStructureTask = (task) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task", "roundBorder");
  taskContainer.dataset.id = task._id;
  taskContainer.addEventListener("click", changeTaskState);
  taskContainer.addEventListener("contextmenu", updateTask);

  // Contenedor para título y descripción
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";

  // Título de la tarea
  const title = document.createElement("span");
  title.classList.add("title-task");
  title.textContent = task.titulo;
  title.style.fontWeight = "bold";
  content.appendChild(title);

  // Descripción de la tarea
  const desc = document.createElement("p");
  desc.classList.add("desc-task");
  desc.textContent = task.descripcion || "";
  desc.style.margin = "4px 0 0 0";
  desc.style.fontSize = "0.9em";
  desc.style.color = "#fff"
  desc.style.backgroundColor = "transparent";
  content.appendChild(desc);

  taskContainer.appendChild(content);

  // Si la tarea está hecha, agrega la clase visual
  if (task.estado) {
    taskContainer.classList.add("done");
  }

  // Botón de eliminar tarea
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const id = task._id;
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (!confirmDelete) return;
    await fetch(`/tareas/${id}`, { method: "DELETE" });
    taskContainer.remove();
    allTasks = allTasks.filter((t) => t._id !== id);
  });

  taskContainer.appendChild(deleteBtn);
  tasksContainer.appendChild(taskContainer);
};

// Función para ordenar las tareas: primero hechas, luego no hechas
const orderTasks = () => {
  allTasks.sort((a, b) => {
    if (a.estado === b.estado) return 0;
    return a.estado ? -1 : 1;
  });

  // Limpiar el contenedor y renderizar las tareas ordenadas
  clearHTML();
  allTasks.forEach((task) => {
    createStructureTask(task);
  });
};

// Limpia el contenedor de tareas de forma eficiente
const clearHTML = () => {
  while (tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild);
  }
};
