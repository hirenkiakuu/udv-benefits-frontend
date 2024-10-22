import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component tests", () => {
  test("test render", () => {
    render(<Button />);
    expect(screen.getByText("button is clicked: false")).toBeInTheDocument();
    screen.debug();
  });

  test("button click test", () => {
    render(<Button />);
    const button = screen.getByText("button is clicked: false");
    fireEvent.click(button);
    expect(screen.getByText("button is clicked: true")).toBeInTheDocument();
  });
});
