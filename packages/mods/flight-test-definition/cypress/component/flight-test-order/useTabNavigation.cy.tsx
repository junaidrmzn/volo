import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { TestMissionOverview } from "../../../src/flight-test-order-overview/flight-test-order-details/test-mission/TestMissionOverview";
import { getAllFlightTestCrewInterceptor } from "../../interceptors/flightTestCrewInterceptors";
import { getFlightTestOrderV2Interceptor } from "../../interceptors/flightTestOrderInterceptors";

describe("TestMissionOverview Component", () => {
    const flightTestOrder = anyFlightTestOrder();

    beforeEach(() => {
        getFlightTestOrderV2Interceptor(flightTestOrder);
        getAllFlightTestCrewInterceptor();

        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1516": { enabled: true } }}>
                <TestMissionOverview flightTestOrderId={flightTestOrder.id} />
            </LocalFeatureFlagsProvider>
        );
    });

    it("should focus on the next tab when pressing the right arrow key", () => {
        cy.get('[role="tab"]').first().focus().trigger("keydown", { keyCode: 39 });
        cy.get('[role="tab"]').eq(1).should("have.focus");
    });

    it("should focus on the previous tab when pressing the left arrow key", () => {
        cy.get('[role="tab"]').eq(1).focus().trigger("keydown", { keyCode: 37 });
        cy.get('[role="tab"]').first().should("have.focus");
    });

    it("should focus on the first tab when pressing the home key", () => {
        cy.get('[role="tab"]').eq(2).focus().trigger("keydown", { keyCode: 36 });
        cy.get('[role="tab"]').first().should("have.focus");
    });

    it("should focus on the last tab when pressing the end key", () => {
        cy.get('[role="tab"]').first().focus().trigger("keydown", { keyCode: 35 });
        cy.get('[role="tab"]').last().should("have.focus");
    });
});
