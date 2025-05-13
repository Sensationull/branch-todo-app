import "./App.css";
import CloseIcon from "./CloseIcon";
import CustomCheckbox from "./CustomCheckbox";
import { useTodo } from "./helpers/useTodo";
import PlusIcon from "./PlusIcon";

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
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <label
          htmlFor="input"
          className="text-5xl text-[color:--primary-header-text-green] mb-4"
        >
          Branch Todos
        </label>
        <div className="flex justify-between gap-x-4">
          <input
            data-testid="todo-input"
            name="input"
            id="input"
            className="h-12 w-full border-b-2 mb-4 border-b-[color:--primary-header-text-green] pl-2"
            value={todoInput}
            onChange={handleChange}
            placeholder="What do you need to do?"
            type="text"
          />
          <button
            className="flex justify-center items-center border-none size-12 rounded-[50%] bg-[--primary-header-text-green] hover:bg-[--accent-brand-text-green]"
            type="submit"
          >
            <PlusIcon className="size-5 fill-white" />
          </button>
        </div>
      </form>
      <section className="flex flex-col py-4 gap-4 overflow-scroll">
        {todoState &&
          todoState.map(({ id, todo, completed }) => (
            <div
              key={id}
              className="border-solid border-2 rounded-[24px] flex justify-between pl-6 pr-8 min-h-12 gap-x-[2px] hover:bg-[color:--accent-bg-gray]"
            >
              <label className="flex gap-x-[16px] text-[color:--primary-text-gray] h-full items-center w-full cursor-pointer truncate">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative text-[color:--primary-text-gray]">
                    <input
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
                {todo}
              </label>
              <button
                onClick={() => handleDelete(id)}
                className="border-solid border-3"
              >
                <CloseIcon className="size-3 fill-(--desctructive-red-primary)" />
              </button>
            </div>
          ))}
      </section>
    </main>
  );
}

export default App;
