import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("handles empty localStorage gracefully", () => {
    // Mock localStorage to return null before rendering
    mockLocalStorage.getItem.mockReturnValue(null);

    // Render the component with empty localStorage
    render(<App />);

    // Verify no todos are rendered
    expect(screen.queryByText("What?")).not.toBeInTheDocument();

    // Verify localStorage was initialized with empty array
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("items", "[]");
  });

  it("loads initial todos from localStorage", () => {
    // Set up initial todos before rendering
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("items");
    expect(screen.getByText("What?")).toBeInTheDocument();
  });

  it("renders the form elements", () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
  });

  it("saves todos to localStorage when adding a new todo", async () => {
    // Set up initial todos before rendering
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    // Render the component first
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    // Get the last call to setItem
    const lastSetItemCall =
      mockLocalStorage.setItem.mock.calls[
        mockLocalStorage.setItem.mock.calls.length - 1
      ];
    const savedTodos = JSON.parse(lastSetItemCall[1]);

    // Verify the structure of saved todos
    expect(savedTodos).toHaveLength(2);
    expect(savedTodos[0]).toEqual({ id: 1, todo: "What?", completed: false });
    expect(savedTodos[1]).toMatchObject({
      todo: "New Todo",
      completed: false,
    });
  });

  it("saves todos to localStorage when toggling completion", async () => {
    // Set up initial todos before rendering
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    // Render the component first
    render(<App />);

    const user = userEvent.setup();
    const checkbox = screen.getByTestId("todo-checkbox");

    await user.click(checkbox);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([{ id: 1, todo: "What?", completed: true }]),
    );
  });

  it("saves todos to localStorage when deleting a todo", async () => {
    // Set up initial todos before rendering
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    // Render the component first
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    // Add a new todo
    await user.type(input, "Todo to delete");
    await user.keyboard("{Enter}");

    // Find and click the delete button for the new todo
    const deleteButton = screen
      .getByText("Todo to delete")
      .closest("div")
      ?.querySelector("button");
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton!);

    // Verify localStorage was updated
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );
  });

  it("adds a new todo when form is submitted", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  it("clears input after adding a todo", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("");
  });

  it("toggles todo completion when checkbox is clicked", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    const user = userEvent.setup();
    const checkbox = screen.getByTestId("todo-checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("deletes a todo when delete button is clicked", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    // Add a new todo
    await user.type(input, "Todo to delete");
    await user.keyboard("{Enter}");

    // Find and click the delete button for the new todo
    const deleteButton = screen
      .getByText("Todo to delete")
      .closest("div")
      ?.querySelector("button");
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton!);

    // Verify the todo is removed
    expect(screen.queryByText("Todo to delete")).not.toBeInTheDocument();
  });

  it("maintains todo order after completion toggle", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, todo: "What?", completed: false }]),
    );

    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByTestId("todo-input");

    // Add two todos
    await user.type(input, "First Todo");
    await user.keyboard("{Enter}");
    await user.type(input, "Second Todo");
    await user.keyboard("{Enter}");

    // Get all checkboxes
    const checkboxes = screen.getAllByTestId("todo-checkbox");

    // Toggle the second todo
    await user.click(checkboxes[1]);

    // Verify the order is maintained
    const todos = screen
      .getAllByTestId("todo-checkbox")
      .map((checkbox) => checkbox.closest("div")?.textContent?.trim());
    expect(todos[0]).toContain("What?");
    expect(todos[1]).toContain("First Todo");
    expect(todos[2]).toContain("Second Todo");
  });
});
