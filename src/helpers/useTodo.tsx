import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Todo } from "./types";
import { ValidationError, errorMessages, validateTodo } from "./validation";

export const useTodo = () => {
  const [todoState, setTodoState] = useState<Todo[] | []>(
    JSON.parse(localStorage.getItem("items") || "[]") || [],
  );
  const [todoInput, setTodoInput] = useState("");
  const [error, setError] = useState<ValidationError | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoState));
  }, [todoState]);

  const createNewTodo = (todoText: string) => {
    const newTodo = { id: Date.now(), todo: todoText, completed: false };
    setTodoState([...todoState, newTodo]);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setIsDirty(true);

    const validation = validateTodo(todoInput, todoState);

    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    createNewTodo(todoInput);
    setTodoInput("");
    setError(null);
    setIsDirty(false);
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    const value = event.target.value;
    setTodoInput(value);

    if (isDirty) {
      const validation = validateTodo(value, todoState);
      setError(validation.isValid ? null : validation.error!);
    }
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

  return {
    todoState,
    todoInput,
    error: error ? errorMessages[error] : null,
    handleSubmit,
    handleChange,
    handleCheckTodo,
    handleDelete,
  };
};
