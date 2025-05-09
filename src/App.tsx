// import { useState } from "react";
import { BaseSyntheticEvent, useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [todoState, setTodoState] = useState([{ id: 0, todo: "What?" }]);
  const [todoInput, setTodoInput] = useState("");

  const createNewTodo = (todoText: string) => {
    const newTodo = { id: todoState.length, todo: todoText };
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
        {todoState.map(({ id, todo }) => (
          <div key={id}>{todo}</div>
        ))}
      </div>
    </>
  );
}

export default App;
