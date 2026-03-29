import { useState, useId } from "react";
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

function useTodo(initial, storageKey = "todos") {
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem(storageKey);
    return items ? JSON.parse(items) : initial;
  });

  const saveToLocalStorage = (todos) => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  };

  const addTodo = (task) => {
    setTodos((prevTodos) => {
      const id = crypto.randomUUID();
      const newTodos = [...prevTodos, { id, task }];
      saveToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      saveToLocalStorage(newTodos);
      return newTodos;
    });
  };

  return { todos, addTodo, removeTodo };
}

export default function App() {
  const [value, setValue] = useState("");
  const { todos, removeTodo, addTodo } = useTodo(initialTodos);

  const trimmedValue = value.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmedValue) return;
    addTodo(trimmedValue);
    setValue("");
  }

  return (
    <div className="todo">
      <h1>Todo List</h1>
      <TodoForm
        onSubmit={handleSubmit}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul aria-live="polite" className="todo__list" aria-label="List of todos">
        {todos.map((todo) => {
          const { id, task } = todo;
          const remove = () => removeTodo(id);
          return <TodoItem key={id} remove={remove} task={task} />;
        })}
      </ul>
    </div>
  );
}

function TodoForm({
  onChange,
  value,
  onSubmit,
  placeholder = "Add your task",
  label = "Enter a task",
  inputName = "task",
}) {
  const id = useId();
  const isDisabled = !value.trim();
  return (
    <form className="todo__input" onSubmit={onSubmit}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type="text"
        name={inputName}
        placeholder={placeholder}
      />

      <button disabled={isDisabled} type="submit" className="std-btn">
        Submit
      </button>
    </form>
  );
}

function TodoItem({ task, remove, actionText = "Delete" }) {
  return (
    <li className="todo__item">
      <span>{task}</span>
      <button
        aria-label={`Delete task ${task}`}
        onClick={remove}
        className="std-btn std-btn--danger"
      >
        {actionText}
      </button>
    </li>
  );
}
