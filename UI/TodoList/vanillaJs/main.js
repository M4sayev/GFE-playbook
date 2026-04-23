import "./styles.css";

// Write your JavaScript here.

const initialTodos = [
  {
    id: 1,
    task: "Walk the dog",
  },
  {
    id: 2,
    task: "Water the plants",
  },
  {
    id: 3,
    task: "Wash the dishes",
  },
];

const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const input = document.getElementById("todo-id");
const announcerSR = document.getElementById("todoAnnouncer");

const state = {
  todos: initialTodos,
};

function announce(message) {
  announcerSR.textContent = message;
}

function appendTodo(todo) {
  if (!todo) return null;

  const li = document.createElement("li");
  li.setAttribute("class", "todo__item");

  const span = document.createElement("span");
  span.textContent = todo.task;

  li.appendChild(span);

  const button = document.createElement("button");
  button.setAttribute("aria-label", `Delete ${todo.task}`);
  button.setAttribute("class", "std-btn std-btn--danger");
  button.textContent = "Delete";

  button.addEventListener("click", () => {
    handleDeleteTodo(todo.id);
    li.remove();
    announce(`Deleted ${todo.task}`);
  });

  li.appendChild(button);

  todoList.appendChild(li);
  announce(`Added a todo ${todo.task}`);
}

function handleDeleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = handleCreateTodo();
  appendTodo(todo);
  input.value = "";
});

function handleCreateTodo() {
  const val = input.value.trim();

  if (!val) {
    return;
  }

  return {
    id: crypto.randomUUID(),
    task: val,
  };
}

state.todos.forEach((todo) => appendTodo(todo));
