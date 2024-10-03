import { render, screen } from "@voloiq/testing";
import { App } from "../App";

describe("App", () =>
    it("should render", () => {
        render(<App />);
        expect(screen.getByText("Loading..."));
    }));
