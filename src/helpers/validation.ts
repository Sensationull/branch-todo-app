import { Todo } from "./types";

export const errorMessages = {
  required: "Please enter a todo",
  minLength: "Todo must be at least 2 characters",
  maxLength: "Todo must be less than 100 characters",
  duplicate: "This todo already exists",
  whitespace: "Todo cannot be empty",
} as const;

export type ValidationError = keyof typeof errorMessages;

export const validateTodo = (
  todo: string,
  existingTodos: Todo[],
): { isValid: boolean; error?: ValidationError } => {
  if (!todo.trim()) {
    return { isValid: false, error: "whitespace" };
  }

  if (todo.length < 2) {
    return { isValid: false, error: "minLength" };
  }

  if (todo.length > 100) {
    return { isValid: false, error: "maxLength" };
  }

  if (existingTodos.some((t) => t.todo.toLowerCase() === todo.toLowerCase())) {
    return { isValid: false, error: "duplicate" };
  }

  return { isValid: true };
};
