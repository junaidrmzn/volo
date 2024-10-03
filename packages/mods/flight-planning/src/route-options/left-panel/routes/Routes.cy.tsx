import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { FlightStatusProvider } from "../../../contexts/flight-status";
import { CypressAppShell, CypressServiceProvider } from "../../../testing/TestWrapper";
import { Routes } from "./Routes";

export const mountComponent = (routes: Route[], routeOptionName?: string) =>
    cy.mount(
        <CypressAppShell>
            <CypressServiceProvider baseUrl="http://api.cypress.voloiq.io">
                <FlightStatusProvider>
                    <Routes routes={routes} routeOptionName={routeOptionName} />
                </FlightStatusProvider>
            </CypressServiceProvider>
        </CypressAppShell>
    );

describe("Routes", () => {
    const routeOptionName = "XRJ - FCO";
    const mockRoute = anyRoute({
        name: "Route Day 1",
        distance: 2000,
    });

    it("should display routes ", () => {
        mountComponent([mockRoute], routeOptionName);

        cy.findByText("XRJ - FCO").should("be.visible");
        cy.findByText("Route Option").should("be.visible");
        cy.findByRole("button", { name: "Add" }).should("be.visible");

        cy.findByText("Route Day 1").should("be.visible");
        cy.contains(/(\d+) min/).should("be.visible");
        cy.contains(/(\d+) NM/).should("be.visible");
    });
});
