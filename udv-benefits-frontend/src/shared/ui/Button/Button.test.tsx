import { render, screen } from "@testing-library/react";
import { Button } from "shared/ui/Button/Button";

describe("Button component tests", () => {
  test.each<{
    size: "large" | "small";
    variant: "primary" | "default" | "text" | "link";
    expectedClass: string;
  }>([
    {
      size: "large",
      variant: "primary",
      expectedClass: "button primary large",
    },
    {
      size: "small",
      variant: "default",
      expectedClass: "button default small",
    },
    {
      size: "large",
      variant: "text",
      expectedClass: "button text large",
    },
    {
      size: "small",
      variant: "link",
      expectedClass: "button link small",
    },
  ])(
    "applies correct class based on parameters",
    ({ size, variant, expectedClass }) => {
      render(
        <Button size={size} variant={variant}>
          test
        </Button>
      );
      const button = screen.getByText("test");
      expect(button).toHaveClass(expectedClass);
    }
  );
});
