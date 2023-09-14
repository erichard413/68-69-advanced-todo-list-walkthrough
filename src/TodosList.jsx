import { useContext } from "react";
import { TodoContext } from "./App";
import { TodoItem } from "./TodoItem";

export function TodosList() {
  const { todos } = useContext(TodoContext);
  return (
    <ul id="list">
      {todos.map(todo => {
        return <TodoItem key={todo.id} {...todo} />;
      })}
    </ul>
  );
}
