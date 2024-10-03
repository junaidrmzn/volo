import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@volocopter/design-library-react";
import { axe } from "jest-axe";
import { I18nProvider } from "@voloiq/i18n";
import { TechnicalError } from "../TechnicalError";

test("User can see a technical error splash", async () => {
    render(
        <ThemeProvider>
            <I18nProvider>
                <TechnicalError onTryAgainClick={() => {}} />
            </I18nProvider>
        </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "Oops!" })).toBeVisible();
    expect(screen.getByText("Something went wrong. Please try again.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Try again" })).toBeVisible();
});

test("User can click the try again button", async () => {
    const tryAgainHandler = jest.fn();

    render(
        <ThemeProvider>
            <I18nProvider>
                <TechnicalError onTryAgainClick={tryAgainHandler} />
            </I18nProvider>
        </ThemeProvider>
    );

    userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(tryAgainHandler).toHaveBeenCalledTimes(1);
});

test("Technical error has no a11y violations", async () => {
    const { container } = render(
        <ThemeProvider>
            <I18nProvider>
                <TechnicalError onTryAgainClick={() => {}} />
            </I18nProvider>
        </ThemeProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
}, 30_000);
