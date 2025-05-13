import "./App.css";
import { useTodo } from "./helpers/useTodo";

function App() {
  const {
    todoState,
    todoInput,
    handleSubmit,
    handleChange,
    handleCheckTodo,
    handleDelete,
  } = useTodo();

  return (
    <main className="border-solid border-4 flex flex-col border-lime-500 h-svh p-16">
      <form
        onSubmit={handleSubmit}
        className="border-solid border-3 flex flex-col"
      >
        <label
          htmlFor="input"
          className="text-5xl text-[color:--primary-header-text-green]"
        >
          Branch Todos
        </label>
        <input
          data-testid="todo-input"
          name="input"
          id="input"
          className="border-b-red-500 border-solid border-4"
          value={todoInput}
          onChange={handleChange}
          placeholder="Add new task"
          type="text"
        />
      </form>
      {todoState &&
        todoState.map(({ id, todo, completed }) => (
          <div key={id} className="border-solid border-4">
            <input
              data-testid="todo-checkbox"
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
    </main>
  );
}

export default App;
