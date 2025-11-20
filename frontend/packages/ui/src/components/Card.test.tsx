import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Card title="Card Title" description="Card Description">
        Content
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Card title="Test" footer={<button>Footer Button</button>}>
        Content
      </Card>
    );
    expect(screen.getByRole("button", { name: /footer button/i })).toBeInTheDocument();
  });

  it("has proper styling classes", () => {
    const { container } = render(<Card title="Test">Content</Card>);
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("rounded-lg", "border", "bg-white", "shadow-sm");
  });
});
