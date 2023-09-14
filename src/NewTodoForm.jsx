import { useRef, useContext } from "react";
import { TodoContext } from "./App";

export function NewTodoForm() {
  const nameRef = useRef();
  const { addNewTodo } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    // add new todo;
    addNewTodo(nameRef.current.value);
    nameRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input autoFocus type="text" ref={nameRef} id="todo-input" />
      <button>Add Todo</button>
    </form>
  );
}
