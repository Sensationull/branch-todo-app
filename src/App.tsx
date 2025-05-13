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
          className="text-5xl text-[color:--primary-header-text-green] mb-4"
        >
          Branch Todos
        </label>
        <input
          data-testid="todo-input"
          name="input"
          id="input"
          className="border-b-red-500 border-solid border-b-2 mb-4"
          value={todoInput}
          onChange={handleChange}
          placeholder="Add new task"
          type="text"
        />
      </form>
      <section className="border-lime-500 border-2 flex flex-col p-4 gap-4">
        {todoState &&
          todoState.map(({ id, todo, completed }) => (
            <div
              key={id}
              className="border-solid border-2 rounded-[24px] flex justify-between px-4"
            >
              <label className="flex border-2 justify-between text-[color:--primary-header-text-green]">
                <input
                  data-testid="todo-checkbox"
                  type="checkbox"
                  className="border-solid border-4"
                  checked={completed}
                  onChange={() => handleCheckTodo({ id, completed })}
                />
                {todo}
              </label>
              <button
                onClick={() => handleDelete(id)}
                className="border-solid border-3"
              >
                Delete
              </button>
            </div>
          ))}
      </section>
    </main>
  );
}

export default App;
