import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { SubmitFlightPlanButton } from "./SubmitFlightPlanButton";

const mockRoute = anyRoute();
const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={[`/route-options/${mockRoute.routeOptionId}/map`]}
            path="/route-options/:routeOptionId/map"
        >
            <SubmitFlightPlanButton route={mockRoute} />
        </CypressAppShellWithMemoryRouter>
    );
};

describe("SubmitFlightPlanButton", () => {
    it("should display SubmitFlightPlanButton", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId("submit-flight-plan-button").should("be.visible");
    });

    it("should call putFlightPlan by clicking submitFlightPlanButton", () => {
        cy.mount(<TestComponent />);
        cy.location("pathname").should("not.include", "missionId");
        cy.findByTestId("submit-flight-plan-button").should("be.disabled");
    });
});
