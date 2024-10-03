import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShell, CypressServiceProvider } from "../../../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../../../testing/url";
import { makeGetCsflSitesInterceptor, makeGetSelectedCsflSitesInterceptor } from "../../../../__mocks__/cypress";
import { ConductedRouteToggleButton, DeviationFromPlannedRouteToggleButton } from "../../../../route-comparison";
import { MapLayerDialog } from "../MapLayerDialog";

const mockRoute = anyRoute();

type TestComponentProps = { route?: Route };

const TestComponent = (props: TestComponentProps) => {
    const { route } = props;
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl={mockedBaseUrl}>
                <MapLayerDialog
                    handleClose={cy.stub().as("mockedHandleClose")}
                    handleToggleSatellite={cy.stub().as("mockedHandleToggleSatellite")}
                    isSatellite
                    handleShowNotam={cy.stub().as("mockedHandleShowNotam")}
                    showNotam={false}
                    handleShowCsflSites={cy.stub().as("mockedHandleShowCsflSites")}
                    showCsflSites={false}
                    showAirspaces={false}
                    toggleAirspaces={cy.stub().as("mockedHandleShowAirspaces")}
                    selectedRoute={route}
                >
                    <ConductedRouteToggleButton
                        showConductedRoute={false}
                        toggleConductedRoute={cy.stub().as("mockedHandleShowConductedRoute")}
                        routeId={mockRoute.id}
                    />
                    <DeviationFromPlannedRouteToggleButton
                        showDeviationFromPlannedRoute={false}
                        toggleDeviationFromPlannedRoute={cy.stub().as("mockedHandleShowDeviationFromPlannedRoute")}
                        routeId={mockRoute.id}
                    />
                </MapLayerDialog>
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

beforeEach(() => {
    makeGetCsflSitesInterceptor();
    makeGetSelectedCsflSitesInterceptor();
});

describe("Waypoint Details", () => {
    it("should render", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByText("Map Type").should("be.visible");
    });

    it("should handle toggle satellite mode", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByTestId("radio-roadmap").click();
        cy.get("@mockedHandleToggleSatellite").should("be.calledOnce");
    });

    it("should handle close", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByRole("button", { name: /close/i }).click();
        cy.get("@mockedHandleClose").should("be.calledOnce");
    });

    it("should handle show airspaces", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId("switch-show-airspaces").click();
        cy.get("@mockedHandleShowAirspaces").should("be.calledOnce");
    });

    it("should handle show conducted route", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByTestId("switch-show-conducted-route").click();
        cy.get("@mockedHandleShowConductedRoute").should("be.calledOnce");
    });

    it("should handle show planned route", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByTestId("switch-show-deviation-from-planned-route").click();
        cy.get("@mockedHandleShowDeviationFromPlannedRoute").should("be.calledOnce");
    });
});
