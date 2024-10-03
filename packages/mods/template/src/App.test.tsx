import { render, screen } from "@voloiq/testing";
import { App } from "./App";

test("User sees template", () => {
    render(<App />);
    expect(screen.getByText("This is just a template")).toBeVisible();
});
