const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const filters = document.querySelector(".filters");
const counter = document.getElementById("taskCount");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {

    list.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {
        filtered = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filtered = todos.filter(todo => todo.completed);
    }

    filtered.forEach(todo => {

        const li = document.createElement("li");

        li.dataset.id = todo.id;

        li.innerHTML = `
            <input
                type="checkbox"
                class="toggle"
                ${todo.completed ? "checked" : ""}>

            <span class="${todo.completed ? "done" : ""}">
                ${todo.text}
            </span>

            <button class="edit">
                Edit
            </button>

            <button class="delete">
                Delete
            </button>
        `;

        list.appendChild(li);

    });

    counter.textContent =
        `${todos.filter(t => !t.completed).length} Active Tasks`;

}

function addTodo() {

    const text = input.value.trim();

    if (!text) return;

    todos.push({

        id: Date.now(),

        text,

        completed: false

    });

    input.value = "";

    saveTodos();

    render();

}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", e => {

    if (e.key === "Enter") {

        addTodo();

    }

});

list.addEventListener("click", e => {

    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    const todo = todos.find(t => t.id === id);

    if (e.target.classList.contains("delete")) {

        todos = todos.filter(t => t.id !== id);

    }

    if (e.target.classList.contains("edit")) {

        const updated = prompt("Edit Task", todo.text);

        if (updated !== null && updated.trim()) {

            todo.text = updated.trim();

        }

    }

    if (e.target.classList.contains("toggle")) {

        todo.completed = e.target.checked;

    }

    saveTodos();

    render();

});

filters.addEventListener("click", e => {

    if (!e.target.dataset.filter) return;

    currentFilter = e.target.dataset.filter;

    render();

});

render();
