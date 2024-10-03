import { CypressAppShell, CypressServiceProvider } from "../../../testing/TestWrapper";
import { RouteOptionMeta } from "./RouteOptionMeta";

export const mountComponent = (aircraftType?: string) =>
    cy.mount(
        <CypressAppShell>
            <CypressServiceProvider baseUrl="http://api.cypress.voloiq.io">
                <RouteOptionMeta aircraftType={aircraftType} />
            </CypressServiceProvider>
        </CypressAppShell>
    );

describe("RouteOptionMeta", () => {
    const aircraftType = "Nimbus 300";

    it("should display route option meta ", () => {
        mountComponent(aircraftType);

        cy.findByText("Scenario").should("be.visible");
        cy.findByText("Feasibility").should("be.visible");

        cy.findByText("Weather Scenario").should("be.visible");
        cy.findAllByText("Standard").should("have.length", 2);
        cy.findByText("Specific").should("be.visible");
        cy.findByText("Live").should("be.visible");

        cy.findByText("Aircraft").should("be.visible");
        cy.findByText("Nimbus 300").should("be.visible");

        cy.findByText("Settings").should("be.visible");
    });
});
