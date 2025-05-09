import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the initial todo list", () => {
    expect(screen.getByText("What?")).toBeInTheDocument();
  });

  it("renders the form elements", () => {
    expect(
      screen.getByLabelText("What do you want to do?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("adds a new todo when form is submitted", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  it("clears input after adding a todo", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("");
  });

  it("toggles todo completion when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("deletes a todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

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
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    // Add two todos
    await user.type(input, "First Todo");
    await user.keyboard("{Enter}");
    await user.type(input, "Second Todo");
    await user.keyboard("{Enter}");

    // Get all checkboxes
    const checkboxes = screen.getAllByRole("checkbox");

    // Toggle the second todo
    await user.click(checkboxes[1]);

    // Verify the order is maintained
    const todos = screen
      .getAllByRole("checkbox")
      .map((checkbox) => checkbox.closest("div")?.textContent?.trim());
    expect(todos[0]).toContain("What?");
    expect(todos[1]).toContain("First Todo");
    expect(todos[2]).toContain("Second Todo");
  });
});
