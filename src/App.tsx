import "./App.css";
import CloseIcon from "./CloseIcon";
import CustomCheckbox from "./CustomCheckbox";
import { useTodo } from "./helpers/useTodo";
import PlusIcon from "./PlusIcon";

function App() {
  const {
    todoState,
    todoInput,
    error,
    handleSubmit,
    handleChange,
    handleCheckTodo,
    handleDelete,
  } = useTodo();

  return (
    <main className="border-solid border-8 flex flex-col border-lime-500 h-svh p-16 items-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full max-w-4xl"
        role="form"
        aria-label="Add new todo"
        noValidate
      >
        <label htmlFor="input" className="text-5xl text-primary-header mb-4">
          Branch Todos
        </label>
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-x-4">
            <input
              data-testid="todo-input"
              name="input"
              id="input"
              className={`h-12 w-full border-b-2 mb-1 pl-2 bg-slate-50 transition-colors duration-200 ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-primary-header focus:border-primary-header"
              }`}
              value={todoInput}
              onChange={handleChange}
              placeholder="What do you need to do?"
              type="text"
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "todo-error" : undefined}
            />
            <button
              className="flex justify-center items-center border-none size-12 rounded-[25%] bg-primary-header hover:bg-accent-brand shadow-[0_2px_4px_rgba(132,204,22,0.2)] hover:shadow-[0_4px_8px_rgba(132,204,22,0.3)] transition-shadow duration-200 shrink-0"
              type="submit"
            >
              <PlusIcon className="size-5 fill-white" />
            </button>
          </div>
          {error && (
            <div
              id="todo-error"
              className="text-red-500 text-sm mb-4 transition-all duration-200"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </form>
      <section className="flex flex-col py-4 gap-4 w-full overflow-scroll max-w-4xl">
        {todoState &&
          todoState.map(({ id, todo, completed }, index) => (
            <div
              key={id}
              style={{ animationDelay: `${index * 150}ms` }}
              className="border-solid border-2 rounded-[24px] flex justify-between pl-6 pr-8 min-h-12 hover:bg-accent-bg shadow-[0_2px_4px_rgba(132,204,22,0.2)] hover:shadow-[0_4px_8px_rgba(132,204,22,0.3)] transition-shadow duration-200 animate-fade-in opacity-0"
            >
              <label className="flex py-4 gap-x-[12px] text-primary-text h-full items-center w-full cursor-pointer text-wrap truncate">
                <div className="inline-flex items-center gap-y-[4px]">
                  <label className="flex items-center cursor-pointer relative text-primary-text">
                    <input
                      data-testid="todo-checkbox"
                      type="checkbox"
                      checked={completed}
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                      id="check4"
                      onChange={() => handleCheckTodo({ id, completed })}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <CustomCheckbox />
                    </span>
                  </label>
                </div>
                <span
                  className={`transition-all duration-200 ${completed ? "line-through opacity-50" : ""}`}
                >
                  {todo}
                </span>
              </label>
              <button
                onClick={() => handleDelete(id)}
                className="border-solid border-3"
              >
                <CloseIcon className="size-3 hover:fill-destructive" />
              </button>
            </div>
          ))}
      </section>
    </main>
  );
}

export default App;
