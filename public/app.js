document.addEventListener('DOMContentLoaded', () => {
    cargarTareas();
});

async function cargarTareas() {
    const response = await fetch('/tareas');
    const tareas = await response.json();
    console.log(tareas);
}