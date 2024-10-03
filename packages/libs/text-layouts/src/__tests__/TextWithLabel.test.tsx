import { render, screen } from "@voloiq/testing";
import { TextWithLabel } from "../text-with-label";

test("Layout can display strings ", () => {
    render(<TextWithLabel label="test" text="testString" />);
    expect(screen.getByText("testString")).toBeVisible();
});

test("Layout can display numbers ", () => {
    render(<TextWithLabel label="test" text={123} />);
    expect(screen.getByText("123")).toBeVisible();
});

test("Layout can display a zero without interpreting it as false", () => {
    render(<TextWithLabel label="test" text={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
});

test("Layout can handle undefined with N/A", () => {
    render(<TextWithLabel label="test" />);
    expect(screen.getByText("N/A")).toBeVisible();
});
