const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const previewBadge = document.getElementById("previewBadge");
const addTaskBtn = document.getElementById("addTask");
const charCount = document.getElementById("charCount");
const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");

let draggedCard = null;

// Character Counter
taskInput.addEventListener("input", () => {
    charCount.textContent = `${taskInput.value.length} / 60`;
});

// Priority Preview
priority.addEventListener("change", () => {
    previewBadge.textContent = priority.value;
    previewBadge.className = "badge";

    if (priority.value === "High") {
        previewBadge.classList.add("high");
    } else if (priority.value === "Medium") {
        previewBadge.classList.add("medium");
    } else {
        previewBadge.classList.add("low");
    }
});

// Add Task
addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task.");
        return;
    }

    createTask(text, priority.value);

    taskInput.value = "";
    charCount.textContent = "0 / 60";

    saveBoard();
    updateCounts();
});

// Create Task Card
function createTask(text, level) {

    const card = document.createElement("div");
    card.className = "task";
    card.draggable = true;

    const p = document.createElement("p");
    p.textContent = text;

    const badge = document.createElement("span");
    badge.classList.add("badge");

    if (level === "High") {
        badge.classList.add("high");
    } else if (level === "Medium") {
        badge.classList.add("medium");
    } else {
        badge.classList.add("low");
    }

    badge.textContent = level;

    card.appendChild(p);
    card.appendChild(badge);

    // Drag
    card.addEventListener("dragstart", () => {
        draggedCard = card;
    });

    // Delete
    card.addEventListener("dblclick", () => {

        if (confirm("Delete this task?")) {
            card.remove();
            updateCounts();
            saveBoard();
        }

    });

    document.querySelector("#todo .task-list").appendChild(card);

    updateCounts();
}

// Drag Functions
function allowDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
}

function drop(e) {

    e.preventDefault();

    const list = e.currentTarget.querySelector(".task-list");

    if (draggedCard) {
        list.appendChild(draggedCard);
    }

    document.querySelectorAll(".column").forEach(col => {
        col.classList.remove("drag-over");
    });

    updateCounts();
    saveBoard();
}

// Remove Highlight
document.querySelectorAll(".column").forEach(col => {

    col.addEventListener("dragleave", () => {
        col.classList.remove("drag-over");
    });

});

// Update Counts
function updateCounts() {

    const todo = document.querySelector("#todo .task-list").children.length;
    const progress = document.querySelector("#progress .task-list").children.length;
    const done = document.querySelector("#done .task-list").children.length;

    document.getElementById("todoCount").textContent = todo;
    document.getElementById("progressCount").textContent = progress;
    document.getElementById("doneCount").textContent = done;

    colorCount("todoCount", todo);
    colorCount("progressCount", progress);
    colorCount("doneCount", done);

}

// Turn Counter Red
function colorCount(id, count) {

    const span = document.getElementById(id);

    if (count > 5) {
        span.classList.add("red-count");
    } else {
        span.classList.remove("red-count");
    }

}

// Save Board
function saveBoard() {

    const board = {};

    ["todo", "progress", "done"].forEach(column => {

        board[column] = [];

        document.querySelectorAll(`#${column} .task`).forEach(task => {

            board[column].push({
                text: task.querySelector("p").textContent,
                priority: task.querySelector(".badge").textContent
            });

        });

    });

    localStorage.setItem("kanbanBoard", JSON.stringify(board));

}

// Load Board
function loadBoard() {

    const board = JSON.parse(localStorage.getItem("kanbanBoard"));

    if (!board) return;

    ["todo", "progress", "done"].forEach(column => {

        const list = document.querySelector(`#${column} .task-list`);
        list.innerHTML = "";

        board[column].forEach(task => {

            const card = document.createElement("div");
            card.className = "task";
            card.draggable = true;

            const p = document.createElement("p");
            p.textContent = task.text;

            const badge = document.createElement("span");
            badge.classList.add("badge");

            if (task.priority === "High") {
                badge.classList.add("high");
            } else if (task.priority === "Medium") {
                badge.classList.add("medium");
            } else {
                badge.classList.add("low");
            }

            badge.textContent = task.priority;

            card.appendChild(p);
            card.appendChild(badge);

            card.addEventListener("dragstart", () => {
                draggedCard = card;
            });

            card.addEventListener("dblclick", () => {

                if (confirm("Delete this task?")) {
                    card.remove();
                    updateCounts();
                    saveBoard();
                }

            });

            list.appendChild(card);

        });

    });

    updateCounts();

}

// Theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem("theme", dark);

    themeBtn.textContent = dark ? "☀ Light Mode" : "🌙 Dark Mode";

});

// Load Theme
function loadTheme() {

    const dark = localStorage.getItem("theme") === "true";

    if (dark) {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀ Light Mode";
    }

}

// Clear All
clearBtn.addEventListener("click", () => {

    if (confirm("Clear all tasks?")) {

        document.querySelectorAll(".task-list").forEach(list => {
            list.innerHTML = "";
        });

        localStorage.removeItem("kanbanBoard");

        updateCounts();

    }

});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {

    loadBoard();
    loadTheme();
    updateCounts();

});