import type { Alert } from "@voloiq-typescript-api/flight-planning-types";
import { Sidebar } from "../../components";
import { CypressAppShellWithMemoryRouter } from "../../testing/TestWrapper";
import { mockedBaseUrl } from "../../testing/url";
import { AlertsList } from "./AlertsList";

const mockedAlerts = [
    {
        id: 165,
        message:
            "Max climbrate exceeded between wps departure and Unnamed (3.31m/s climb needed for 40.0kts at departure, but max climb is 2.1m/s). Adjust speed to max 25.37kts or change coordinates/altitude on either wp.",
        type: "ttoResult",
        routeId: 15,
    },
    {
        id: 166,
        message:
            "Max climbrate exceeded between wps Unnamed and Unnamed (8.17m/s climb needed for 40.0kts at Unnamed, but max climb is 2.1m/s). Adjust speed to max 10.28kts or change coordinates/altitude on either wp.",
        type: "ttoResult",
        routeId: 15,
    },
];

const TestComponent = (props: { alerts: Alert[] }) => {
    const { alerts } = props;
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/alerts"]}
            path="/route-options/:routeOptionId/map/alerts"
        >
            <Sidebar>
                <AlertsList closeRightSidebar={cy.stub().as("mockedCloseSidebar")} alerts={alerts} />
            </Sidebar>
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Alerts List", () => {
    it("should show heading 'No Alerts' without mockdata", () => {
        cy.mount(<TestComponent alerts={[]} />);
        cy.findByText("No Alerts").should("be.visible");
    });

    it("should show heading 'Alerts' with mockdata", () => {
        cy.mount(<TestComponent alerts={mockedAlerts} />);
        cy.findByText("Alerts").should("be.visible");
    });

    it("should display alert", () => {
        cy.mount(<TestComponent alerts={mockedAlerts} />);

        cy.findByText(`${mockedAlerts[0]?.message}`).should("be.visible");
        cy.findByTestId(`alerts-list-item-${mockedAlerts[0]?.id}`).should("be.visible");
    });

    it("should fire close event", () => {
        cy.mount(<TestComponent alerts={mockedAlerts} />);

        cy.findByText(`${mockedAlerts[0]?.message}`).should("be.visible");
        cy.findByTestId("alerts-list-close-button").click();
        cy.get("@mockedCloseSidebar").should("have.been.calledOnce");
    });
});
