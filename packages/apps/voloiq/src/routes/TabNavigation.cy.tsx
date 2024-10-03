import { Box } from "@volocopter/design-library-react";
import { TabNavigation } from "./TabNavigation";

describe("Tab Navigation", () => {
    const TestComponent = () => (
        <TabNavigation
            label="Flight Test Suite"
            tabs={[
                {
                    path: "logs",
                    label: "Logbook",
                    requiresPermissionsFor: ["Log"],
                },
                {
                    path: "definitions",
                    label: "Flight Test Definitions",
                    requiresPermissionsFor: ["FlightTestDefinition"],
                },
                {
                    path: "orders",
                    label: "Flight Test Orders",
                    requiresPermissionsFor: ["FlightTestOrder"],
                },
                {
                    path: "test-points",
                    label: "Test Points",
                    requiresPermissionsFor: ["TestPoint"],
                },
            ]}
        >
            <Box>Some content goes in here</Box>
        </TabNavigation>
    );
    it("User with all permissions sees all menu items", () => {
        cy.mount(<TestComponent />, { authorizationConfiguration: ["*"] });

        cy.findByRole("button", { name: "Logbook" }).should("be.visible");
        cy.findByRole("button", { name: "Flight Test Definitions" }).should("be.visible");
        cy.findByRole("button", { name: "Flight Test Orders" }).should("be.visible");
        cy.findByRole("button", { name: "Test Points" }).should("be.visible");
    });

    it("User with limited permissions sees only menu items they have permission for", () => {
        cy.mount(<TestComponent />, { authorizationConfiguration: ["Log.read", "TestPoint.read"] });

        cy.findByRole("button", { name: "Logbook" }).should("be.visible");
        cy.findByRole("button", { name: "Flight Test Definitions" }).should("not.exist");
        cy.findByRole("button", { name: "Flight Test Orders" }).should("not.exist");
        cy.findByRole("button", { name: "Test Points" }).should("be.visible");
    });
});
