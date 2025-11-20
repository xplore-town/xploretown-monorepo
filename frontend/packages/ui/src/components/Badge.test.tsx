import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders badge with label", () => {
    render(<Badge label="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders with correct variant classes", () => {
    const { container } = render(<Badge label="Success" variant="success" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("bg-green-200", "text-green-800");
  });

  it("renders with correct size classes", () => {
    const { container } = render(<Badge label="Large" size="lg" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("px-4", "py-2", "text-base");
  });

  it("applies custom className", () => {
    const { container } = render(<Badge label="Test" className="custom-class" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass("custom-class");
  });
});
