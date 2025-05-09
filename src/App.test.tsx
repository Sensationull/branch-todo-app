import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders the initial todo list", () => {
    render(<App />);
    expect(screen.getByText("What?")).toBeInTheDocument();
  });

  it("renders the form elements", () => {
    render(<App />);
    expect(
      screen.getByLabelText("What do you want to do?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("adds a new todo when form is submitted", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox");
    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  it("clears input after adding a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox");
    await user.type(input, "New Todo");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("");
  });
});
