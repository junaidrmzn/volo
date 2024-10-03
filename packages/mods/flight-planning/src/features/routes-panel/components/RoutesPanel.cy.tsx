import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { RoutesPanel } from "./RoutesPanel";

const mockRoute = anyRoute();

const TestComponent = (props: { route: string }) => {
    const { route } = props;

    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={[route]}
            path="/route-options/:routeOptionId/map"
        >
            <RoutesPanel
                routes={[mockRoute]}
                resetRouteTemplatePreview={cy.stub().as("mockResetRouteTemplatePreview")}
                toggleRouteTemplateList={cy.stub().as("mockToggleRouteTemplateList")}
                handleRefocusCallback={cy.stub().as("mockHandleRefocusCallback")}
            />
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Routes Panel", () => {
    it("should display RouteList if selectedRoute is undefined", () => {
        cy.mount(
            <TestComponent route={`/route-options/${mockRoute.routeOptionId}/map?displayedRoutes=${mockRoute.id}`} />
        );
        cy.findByText("Routes").should("be.visible");
        cy.get("@mockHandleRefocusCallback").should("not.have.been.called");
    });

    it("should display RouteDetails if selectedRoute is set", () => {
        cy.mount(
            <TestComponent
                route={`/route-options/${mockRoute.routeOptionId}/map?displayedRoutes=${mockRoute.id}&selectedRoute=${mockRoute.id}`}
            />
        );
        cy.findByText(mockRoute.name).should("be.visible");
        cy.get("@mockHandleRefocusCallback").should("not.have.been.called");
    });
});
