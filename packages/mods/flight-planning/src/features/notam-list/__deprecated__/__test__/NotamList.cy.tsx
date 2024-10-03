import { Sidebar } from "../../../../components";
import { CypressAppShellWithMemoryRouter } from "../../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../../testing/url";
import { makePostNotamInterceptor } from "../../../__mocks__/cypress";
import { NotamList } from "../NotamList";

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/notams"]}
            path="/route-options/:routeOptionId/map/notams"
        >
            <Sidebar>
                <NotamList closeRightSidebar={cy.stub().as("mockCloseSidebar")} latitude={0} longitude={0} />
            </Sidebar>
        </CypressAppShellWithMemoryRouter>
    );
};

const mockedNotam = {
    features: [
        {
            properties: {
                externalId: "40965c2d-22a5-4ab3-905c-5453703dd254",
                text: "VOR PART OF VOR/DME BT 116.100MHZ NOT USABLE WITHIN 063/083 SECTOR",
            },
        },
    ],
};

describe("Notam List", () => {
    it("should show notams and fire close event on click", () => {
        makePostNotamInterceptor();

        cy.mount(<TestComponent />);

        cy.findByText("Notams").should("be.visible");
        cy.findByText(`${mockedNotam.features[0]?.properties.text}`).should("be.visible");
        cy.findByTestId(`notam-list-item-${mockedNotam.features[0]?.properties.externalId}-focus-button`).should(
            "be.visible"
        );
        cy.findByTestId("notam-list-close-button").click();
        cy.get("@mockCloseSidebar").should("have.been.calledOnce");
    });
});
