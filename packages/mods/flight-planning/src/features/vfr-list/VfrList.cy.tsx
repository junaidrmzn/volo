import { VfrListPanel } from "../../../cypress/page-objects/vfrlist";
import { Sidebar } from "../../components";
import { CypressAppShellWithMemoryRouter } from "../../testing/TestWrapper";
import { mockedBaseUrl } from "../../testing/url";
import { VfrList } from "./VfrList";
import { mockedVfrList } from "./__mocks__/vfrlist";
import type { VfrLayer } from "./types";

const TestComponent = (props: { vfrLayersList: VfrLayer[] | undefined }) => {
    const { vfrLayersList } = props;
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/vfrlayers"]}
            path="/route-options/:routeOptionId/map/vfrlayers"
        >
            <Sidebar>
                <VfrList
                    vfrLayersList={vfrLayersList}
                    selectedVfrLayers={[]}
                    handleVfrLayerSelection={cy.stub().as("mockHandleVfrLayerSelection")}
                    closeRightSidebar={cy.stub().as("mockCloseSidebar")}
                />
            </Sidebar>
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Vfr List", () => {
    it("should show 'No Entries' message when no maps are available", () => {
        cy.mount(<TestComponent vfrLayersList={[]} />);
        cy.findByText("No VfrMap entries were found. Please use the upload function below to add a new entry.").should(
            "be.visible"
        );
    });

    it("should show heading", () => {
        cy.mount(<TestComponent vfrLayersList={mockedVfrList} />);
        cy.findByText("Aeronautical maps").should("be.visible");
    });

    it("should show mocked map entries, checkboxes and selectmenu", () => {
        cy.mount(<TestComponent vfrLayersList={mockedVfrList} />);

        VfrListPanel.uploadButton().should("be.visible");
        VfrListPanel.selectMenu().should("be.visible");
        VfrListPanel.checkBoxes().should("have.length", 2);
        cy.findByText("LF AD 2 LFFE VAC en MaptilerDesktopRendering").should("be.visible");
        cy.findByText("LF AD 2 LFFE VAC en untransparent").should("be.visible");
    });

    it("should show delete modal", () => {
        cy.mount(<TestComponent vfrLayersList={mockedVfrList} />);

        cy.findByTestId(`vfr-map-delete-button-${mockedVfrList[0]?.id}`).click();
        cy.findByText("Are you sure that you want to delete this map").should("be.visible");
        VfrListPanel.modalCancelButton().should("be.visible");
        VfrListPanel.modalDeleteModal().should("be.visible");
    });

    it("should fire close event by clicking close button", () => {
        cy.mount(<TestComponent vfrLayersList={mockedVfrList} />);

        VfrListPanel.closeButton().click();
        cy.get("@mockCloseSidebar").should("have.been.calledOnce");
    });
});
