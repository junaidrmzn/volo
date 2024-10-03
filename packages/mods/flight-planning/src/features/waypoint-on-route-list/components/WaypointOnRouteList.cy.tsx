import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { CypressAppShell, CypressServiceProvider } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { WaypointOnRouteList } from "./WaypointOnRouteList";

const mockRoute = anyRoute();
const mockedWaypointsOnRoute = [
    anyWaypoint({ id: 1, name: "WP1", routeSequenceIndex: 0, lng: 0, lat: 0, alt: 7 }),
    anyWaypoint({ id: 2, name: "WP2", routeSequenceIndex: 1, lng: 1, lat: 2, alt: 11 }),
    anyWaypoint({ id: 3, name: "WP3", routeSequenceIndex: 2, lng: 3, lat: 5, alt: 13 }),
];

const TestComponent = () => {
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl={mockedBaseUrl}>
                <WaypointOnRouteList waypoints={mockedWaypointsOnRoute} routeId={mockRoute.id} />
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

describe("WaypointOnRouteList", () => {
    it("should render", () => {
        cy.mount(<TestComponent />);
        cy.findByText(`WP0 - ${mockedWaypointsOnRoute[0]?.name}`).should("be.visible");
    });

    it("should exist button to view detail", () => {
        cy.mount(<TestComponent />);
        cy.findAllByTestId(`waypoints-list-show-detail-${mockedWaypointsOnRoute[0]?.routeSequenceIndex}-btn`).should(
            "be.visible"
        );
    });
});
