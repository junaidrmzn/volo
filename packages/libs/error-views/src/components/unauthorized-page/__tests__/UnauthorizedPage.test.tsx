import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@volocopter/design-library-react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { AuthenticationProvider, parseAuthConfiguration } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { UnauthorizedPage } from "../UnauthorizedPage";
import staticAuthConfiguration from "./mock-static-auth-config.json";

test("User can see a not authorized content", async () => {
    const authConfiguration = parseAuthConfiguration(JSON.stringify(staticAuthConfiguration));

    render(
        <ThemeProvider>
            <I18nProvider>
                <AuthenticationProvider authConfiguration={authConfiguration}>
                    <MemoryRouter>
                        <UnauthorizedPage />
                    </MemoryRouter>
                </AuthenticationProvider>
            </I18nProvider>
        </ThemeProvider>
    );

    expect(
        screen.getByRole("heading", { name: "You do not have permission to access the requested page" })
    ).toBeVisible();
    expect(screen.getByText("Either go back to the previous page or log in as a different user.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Log in as different user" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Go back" })).toBeVisible();
});

test("Unauthorized page has no a11y violations", async () => {
    const authConfiguration = parseAuthConfiguration(JSON.stringify(staticAuthConfiguration));

    const { container } = render(
        <ThemeProvider>
            <I18nProvider>
                <AuthenticationProvider authConfiguration={authConfiguration}>
                    <MemoryRouter>
                        <UnauthorizedPage />
                    </MemoryRouter>
                </AuthenticationProvider>
            </I18nProvider>
        </ThemeProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
}, 30_000);
