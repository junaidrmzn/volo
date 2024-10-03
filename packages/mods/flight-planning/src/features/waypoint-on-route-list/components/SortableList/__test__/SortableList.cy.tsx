import { Waypoint, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { CypressAppShell, CypressServiceProvider } from "../../../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../../../testing/url";
import { SortableList } from "../SortableList";

const mockedWaypointsOnRoute = [
    anyWaypoint({ id: 1, name: "Roma Termini", routeSequenceIndex: 0 }),
    anyWaypoint({ id: 2, name: "Aeroporto", routeSequenceIndex: 1 }),
];

const TestComponent = () => {
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl={mockedBaseUrl}>
                <SortableList
                    items={mockedWaypointsOnRoute}
                    handleDrop={cy.stub().as("mockDropHandler")}
                    handleDragOver={cy.stub().as("mockDragOverHandler")}
                    handleDragStart={cy.stub().as("mockDragStartHandler")}
                    onItemSelect={cy.stub().as("mockItemSelectHandler")}
                />
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

describe("SortableList", () => {
    beforeEach(() => {
        cy.mount(<TestComponent />);
    });
    const firstWaypoint = mockedWaypointsOnRoute?.[0] as Waypoint;

    it("should render sortable list", () => {
        cy.findByText(`WP0 - ${firstWaypoint.name}`).should("be.visible");
    });

    it("should select item by clicking on wp name", () => {
        cy.findAllByTestId(`waypoints-list-show-detail-${firstWaypoint.routeSequenceIndex}-btn`).click();
        cy.get("@mockItemSelectHandler").should("have.been.calledOnce");
    });

    it("should emit drag start event", () => {
        cy.contains(`WP0 - ${firstWaypoint.name}`).trigger("dragstart");
        cy.get("@mockDragStartHandler").should("have.been.calledOnce");
    });

    it("should emit drag over event", () => {
        cy.contains(`WP0 - ${firstWaypoint.name}`).trigger("dragover");
        cy.get("@mockDragOverHandler").should("have.been.calledOnce");
    });

    it("should emit drop event", () => {
        cy.contains(`WP0 - ${firstWaypoint.name}`).trigger("drop");
        cy.get("@mockDropHandler").should("have.been.calledOnce");
    });
});
