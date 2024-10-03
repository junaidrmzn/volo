import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Text, ThemeProvider } from "@volocopter/design-library-react";
import { axe } from "jest-axe";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { I18nProvider } from "@voloiq/i18n";
import { NotFoundPage } from "../NotFoundPage";

test("User can see a not found splash layout", async () => {
    render(
        <ThemeProvider>
            <I18nProvider>
                <MemoryRouter>
                    <NotFoundPage />
                </MemoryRouter>
            </I18nProvider>
        </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "The page you're looking for couldn't be found" })).toBeVisible();
    expect(screen.getByText("Check the web address and try again. Or go back to the previous page.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Go back" })).toBeVisible();
});

test("User can go back", async () => {
    render(
        <ThemeProvider>
            <I18nProvider>
                <MemoryRouter initialEntries={["/overview", `/overview/db962225-e0eb-45a8-9325-905807ca8710`]}>
                    <Routes>
                        <Route path="/overview" element={<Text>Overview</Text>} />
                        <Route path="/overview/:logId" element={<NotFoundPage />} />
                    </Routes>
                </MemoryRouter>
            </I18nProvider>
        </ThemeProvider>
    );

    userEvent.click(screen.getByRole("button", { name: "Go back" }));

    await screen.findByText("Overview");
});

test("User can go back with a custom back route", async () => {
    render(
        <ThemeProvider>
            <I18nProvider>
                <MemoryRouter initialEntries={[`/overview/db962225-e0eb-45a8-9325-905807ca8710`]}>
                    <Routes>
                        <Route path="/overview" element={<Text>Overview</Text>} />
                        <Route path="/overview/:logId" element={<NotFoundPage backRoute="../overview" />} />
                    </Routes>
                </MemoryRouter>
            </I18nProvider>
        </ThemeProvider>
    );

    userEvent.click(screen.getByRole("button", { name: "Go back" }));

    await screen.findByText("Overview");
});

test("Not found page has no a11y violations", async () => {
    const { container } = render(
        <ThemeProvider>
            <I18nProvider>
                <MemoryRouter>
                    <NotFoundPage />
                </MemoryRouter>
            </I18nProvider>
        </ThemeProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
}, 30_000);
