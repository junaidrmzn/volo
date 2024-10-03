import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { makeGetRouteOptionsInterceptor, makeGetRoutesInterceptor } from "../../__mocks__/cypress";
import { RouteList } from "./RouteList";

const mockRoutes = [
    anyRoute({ id: 1, name: "route1" }),
    anyRoute({ id: 2, name: "route2" }),
    anyRoute({ id: 3, name: "route3" }),
    anyRoute({ id: 4, name: "route4" }),
];

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map"]}
            path="/route-options/:routeOptionId/map"
        >
            <RouteList handleCreateNewRoute={cy.stub().as("mockHandleCreateNewRoute")} routes={mockRoutes} />
        </CypressAppShellWithMemoryRouter>
    );
};

beforeEach(() => {
    makeGetRoutesInterceptor();
    makeGetRouteOptionsInterceptor();
});

describe("Route List", () => {
    it("should show route list", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Routes").should("be.visible");
    });

    it("should show 4 routes", () => {
        cy.mount(<TestComponent />);
        cy.get("@getRoutes").then(() => {
            cy.findByText("route1").should("be.visible");
            cy.findByText("route2").should("be.visible");
            cy.findByText("route3").should("be.visible");
            cy.findByText("route4").should("be.visible");
        });
    });

    it("should trigger mockHandleCreateNewRoute by clicking add button", () => {
        cy.mount(<TestComponent />);
        cy.get("@getRoutes").then(() => {
            cy.findByTestId("route-list-add").click();
            cy.get("@mockHandleCreateNewRoute").should("have.been.calledOnce");
        });
    });

    it("should trigger mockExportRouteOptionKml by clicking KML export button", () => {
        cy.mount(<TestComponent />);
        cy.get("@getRoutes").then(() => {
            cy.findByTestId("route-details-menu-button").click();
            cy.findByTestId("menu-export-route-option-kml-button").click();
        });
    });

    it("should trigger mockExportRouteOptionCsv by clicking CSV export button", () => {
        cy.mount(<TestComponent />);
        cy.get("@getRoutes").then(() => {
            cy.findByTestId("route-details-menu-button").click();
            cy.findByTestId("menu-export-route-option-csv-button").click();
        });
    });

    it("should trigger mockExportRouteOptionExcel by clicking Excel export button", () => {
        cy.mount(<TestComponent />);
        cy.get("@getRoutes").then(() => {
            cy.findByTestId("route-details-menu-button").click();
            cy.findByTestId("menu-export-route-option-excel-button").click();
        });
    });
});
