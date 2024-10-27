import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading classes testsuite", () => {
  test("test render", () => {
    render(<Heading>test</Heading>);
    expect(screen.getByText("test")).toBeInTheDocument();
    screen.debug();
  });

  test("applies large class bases on large property", () => {
    render(<Heading>test</Heading>);
    expect(screen.getByText("test")).toHaveClass("large");
    screen.debug();
  });

  test("applies medium class bases on large property", () => {
    render(<Heading size="medium">test</Heading>);
    expect(screen.getByText("test")).toHaveClass("medium");
    screen.debug();
  });

  test("renders h2 when size is medium", () => {
    render(<Heading size="medium">test</Heading>);
    const headingElement = screen.getByRole("heading", { level: 2 });
    expect(headingElement).toBeInTheDocument();
    screen.debug();
  });
});
