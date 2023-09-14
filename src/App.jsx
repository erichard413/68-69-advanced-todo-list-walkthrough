import { useState, useEffect, useContext, createContext } from "react";
import { useReducer } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";
import { NewTodoForm } from "./NewTodoForm";
import { TodosList } from "./TodosList";
import { TodoFilterForm } from "./TodoFilterForm";

const LOCAL_STORAGE_KEY = "TODOS";

//reducer actions
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

//reducer function
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter(t => t.id !== payload.id);
    case ACTIONS.UPDATE:
      return todos.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name };
        }
        return todo;
      });
    default:
      throw new Error(`No action found for ${type}`);
  }
}

// create context

export const TodoContext = createContext();

function App() {
  const [filterName, setFilterName] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);
  //use local storage, set local storage todos into state. If no local storage todos, set to empty array.
  const [todos, dispatch] = useReducer(reducer, [], initialValue => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value == null) return initialValue;

    return JSON.parse(value);
  });

  //create a variable to filtered todos in state
  const filteredTodos = todos.filter(todo => {
    if (hideCompleted && todo.completed) return false;
    return todo.name.toLowerCase().includes(filterName.toLowerCase());
  });

  //update local storage every time todos changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name: name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({
      type: ACTIONS.TOGGLE,
      payload: { id: todoId, completed: completed },
    });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } });
  }

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addNewTodo,
        toggleTodo,
        deleteTodo,
        updateTodoName,
      }}
    >
      <TodoFilterForm
        filterName={filterName}
        setFilterName={setFilterName}
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
      />
      <TodosList />
      <NewTodoForm />
    </TodoContext.Provider>
  );
}

export default App;
