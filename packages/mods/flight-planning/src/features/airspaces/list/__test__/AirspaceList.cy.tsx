import { Select } from "../../../../../cypress/selectors";
import { Sidebar } from "../../../../components";
import { CypressAppShellWithOutletContext } from "../../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../../testing/url";
import { makeGetAirspacesInterceptor } from "../../../__mocks__/cypress/AirspacesInterceptor";
import { useAirspaces } from "../../layer/useAirspaces";
import { AirspaceList } from "../AirspaceList";

const TestComponent = () => {
    const mockedCloseRightSidebar = cy.stub().as("mockedCloseRightSidebar");
    const { selectedAirspaceOptions, setSelectedAirspaceOptions } = useAirspaces();
    const mockedOutlet = {
        closeRightSidebar: mockedCloseRightSidebar,
        selectedAirspaceOptions,
        setSelectedAirspaceOptions,
        altitudeRange: [0, 10_000],
    };
    return (
        <CypressAppShellWithOutletContext
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/soc-settings"]}
            path="/route-options/:routeOptionId/map/soc-settings"
            context={mockedOutlet}
        >
            <Sidebar>
                <AirspaceList closeRightSidebar={mockedCloseRightSidebar} />
            </Sidebar>
        </CypressAppShellWithOutletContext>
    );
};

describe("Airspace List", () => {
    beforeEach(() => {
        makeGetAirspacesInterceptor();
        cy.mount(<TestComponent />);
    });
    it("should show heading", () => {
        cy.findByText("Airspaces").should("be.visible");
    });
    it("should show only CTR filtered airspaces (OR filtering)", () => {
        Select.selectByOptionName("Filter types and classifications", "CTR");
        cy.findByRole("list", { name: "Airspaces" }).findAllByRole("listitem").should("have.length", 2);
    });
    it("should show CTR and P filtered airspaces (OR filtering)", () => {
        Select.selectByOptionName("Filter types and classifications", "CTR");
        Select.selectByOptionName("Filter types and classifications", "P");
        cy.findByRole("list", { name: "Airspaces" }).findAllByRole("listitem").should("have.length", 3);
    });
});
