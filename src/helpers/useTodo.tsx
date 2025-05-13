import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Todo } from "./types";

export const useTodo = () => {
  const [todoState, setTodoState] = useState<Todo[] | []>(
    JSON.parse(localStorage.getItem("items") || "[]") || [],
  );
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoState));
  }, [todoState]);

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

  return {
    todoState,
    todoInput,
    handleSubmit,
    handleChange,
    handleCheckTodo,
    handleDelete,
  };
};
