import { Sidebar } from "../../components";
import { CypressAppShellWithOutletContext } from "../../testing/TestWrapper";
import { mockedBaseUrl } from "../../testing/url";
import { METERS_TO_FEET } from "../../utils";
import { createMockedCsflSite } from "../state-of-charge/__mocks__/csflSite";
import { CsflDetails } from "./CsflDetails";

const fakeAltitude = 100;
const mockedCsflSite = createMockedCsflSite({ name: "Dummy Name", alt: fakeAltitude });

const TestComponent = () => {
    const mockedOutlet = {
        selectedSite: mockedCsflSite,
        closeRightSidebar: cy.stub().as("mockedCloseRightSidebar"),
    };

    return (
        <CypressAppShellWithOutletContext
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/csflSite"]}
            path="/route-options/:routeOptionId/map/csflSite"
            context={mockedOutlet}
        >
            <Sidebar>
                <CsflDetails />
            </Sidebar>
        </CypressAppShellWithOutletContext>
    );
};

describe("Csfl Details", () => {
    it("should render", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Dummy Name").should("be.visible");
    });

    it("should trigger close sidebar", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId("csfl-site-details-close").click();
        cy.get("@mockedCloseRightSidebar").should("have.been.calledOnce");
    });

    it("should show the altitude in feet", () => {
        cy.mount(<TestComponent />);
        const expectedAltitude = (fakeAltitude * METERS_TO_FEET).toFixed(2);
        cy.findByText("Altitude (ft)").next().should("have.text", expectedAltitude);
    });
});
