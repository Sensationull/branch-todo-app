// import { useState } from "react";
import { BaseSyntheticEvent, useState } from "react";
import "./App.css";

function App() {
  const [todoState, setTodoState] = useState([
    { id: Date.now(), todo: "What?", completed: false },
  ]);
  const [todoInput, setTodoInput] = useState("");

  const createNewTodo = (todoText: string) => {
    const newTodo = { id: Date.now(), todo: todoText, completed: false };
    setTodoState([...todoState, newTodo]);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    createNewTodo(todoInput);
    setTodoInput("");
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    setTodoInput(event.target.value);
  };

  const handleCheckTodo = ({
    id,
    completed,
  }: {
    id: number;
    completed: boolean;
  }) => {
    const changedTodo = todoState.filter((todos) => todos.id === id);
    // update the changed todo
    changedTodo[0].completed = !completed;
    // update the todo state appropriately
    setTodoState((prevState) => {
      const todosToKeep = prevState.filter((prevTodo) => prevTodo.id !== id);
      // place the todos back into the order you originally found them
      return [...todosToKeep, ...changedTodo].sort((a, b) => a.id - b.id);
    });
  };

  const handleDelete = (id: number) => {
    setTodoState((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">What do you want to do?</label>
          <input
            name="input"
            id="input"
            className="border-red-500 border-solid border-4"
            value={todoInput}
            onChange={handleChange}
          />
        </form>
        {todoState.map(({ id, todo, completed }) => (
          <div key={id} className="border-solid border-4">
            <input
              type="checkbox"
              className="border-solid border-4"
              checked={completed}
              onChange={() => handleCheckTodo({ id, completed })}
            />
            {todo}
            <button
              onClick={() => handleDelete(id)}
              className="border-solid border-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
