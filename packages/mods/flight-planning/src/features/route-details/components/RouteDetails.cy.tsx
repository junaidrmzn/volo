import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { makeGetWaypointsInterceptor } from "../../__mocks__/cypress/WaypointsInterceptor";
import { RouteDetails } from "./RouteDetails";

const mockRoute = anyRoute();

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={[`/route-options/${mockRoute.routeOptionId}/map`]}
            path="/route-options/:routeOptionId/map"
        >
            <RouteDetails route={mockRoute} />
        </CypressAppShellWithMemoryRouter>
    );
};

beforeEach(() => {
    makeGetWaypointsInterceptor();
});

describe("Route Details", () => {
    it("should display RouteDetailsHeader", () => {
        cy.mount(<TestComponent />);
        cy.wait(["@getWaypoints"]).then(() => {
            cy.findByText(mockRoute.name).should("be.visible");
        });
    });

    it("should display WaypointDetails by clicking on detail button", () => {
        cy.mount(<TestComponent />);
        cy.wait(["@getWaypoints"]);
        cy.findByText("WP0 - WP1").should("be.visible");
        cy.findByTestId("waypoints-list-show-detail-0-btn").click();
    });
});
