import { Sidebar } from "../../../components";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { makeGeNotamsInterceptor } from "../../__mocks__/cypress";
import { NotamList } from "../NotamList";

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/notams"]}
            path="/route-options/:routeOptionId/map/notams"
        >
            <Sidebar>
                <NotamList
                    routeOptionId={1}
                    latitude={10}
                    longitude={20}
                    closeRightSidebar={cy.stub().as("mockCloseSidebar")}
                />
            </Sidebar>
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Notam List", () => {
    beforeEach(() => {
        makeGeNotamsInterceptor(1, 10, 20);
    });

    it("should render Notams text", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Notams").should("be.visible");
    });

    it("should fire close event on click", () => {
        cy.mount(<TestComponent />);
        cy.findByLabelText("close").should("be.visible").click();
        cy.get("@mockCloseSidebar").should("have.been.called");
    });
});
