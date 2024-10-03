import {
    ResourceOverviewAdd,
    ResourceOverviewPage,
    ResourceOverviewPreview,
    ResourceOverviewSort,
} from "../../../../cypress/page-objects/routeoption";
import { Select } from "../../../../cypress/selectors";
import { CypressAppShell, CypressServiceProvider } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import {
    makeGetExternalAircraftTypesInterceptor,
    makeGetRouteOptionInterceptor,
    makeGetRouteOptionsInterceptor,
    makeGetVertiportsInterceptor,
    makePostRouteOptionInterceptor,
} from "../../__mocks__/cypress";
import { mockedRouteOption } from "../../__mocks__/routeOption";
import { RouteOptionResourceOverview } from "./RouteOptionResourceOverview";

const TestRouteOptionResourceOverview = () => (
    <CypressAppShell>
        <CypressServiceProvider baseUrl={mockedBaseUrl}>
            <RouteOptionResourceOverview />
        </CypressServiceProvider>
    </CypressAppShell>
);

describe("RouteOptionResourceOverview", () => {
    beforeEach(() => {
        makeGetRouteOptionsInterceptor();
        makeGetRouteOptionInterceptor();
        makeGetExternalAircraftTypesInterceptor();
        makeGetVertiportsInterceptor();
    });

    it("render list of route options", () => {
        cy.mount(<TestRouteOptionResourceOverview />);
        cy.wait("@getRouteOptions");

        ResourceOverviewPage.addButton().should("be.visible");
        ResourceOverviewPage.sortButton().should("be.visible");

        ResourceOverviewPage.overviewListItems()
            .first()
            .within(() => {
                cy.findByText(mockedRouteOption.name).should("be.visible");
            });
        ResourceOverviewPage.overviewListItems()
            .last()
            .within(() => {
                cy.findByText(mockedRouteOption.name).should("be.visible");
            });
    });

    it("can preview route options", () => {
        cy.mount(<TestRouteOptionResourceOverview />);
        cy.wait("@getRouteOptions");

        ResourceOverviewPage.overviewListItems().first().click();
        ResourceOverviewPreview.previewPanel().should("be.visible");
        ResourceOverviewPreview.headerText().should("include.text", mockedRouteOption.name);
        ResourceOverviewPreview.fileFlightPlanButton().should("be.visible");
        ResourceOverviewPreview.openButton().should("be.visible");
        ResourceOverviewPreview.deleteButton().should("be.visible");
    });

    it("can delete route options", () => {
        cy.mount(<TestRouteOptionResourceOverview />);
        cy.wait("@getRouteOptions");

        ResourceOverviewPage.overviewListItems().first().click();

        ResourceOverviewPreview.deleteButton().click();
        ResourceOverviewPreview.deleteModal().should("be.visible");
        ResourceOverviewPreview.deleteModalDeleteButton().should("be.visible");
        ResourceOverviewPreview.deleteModalDeleteButton().should("be.visible");
        ResourceOverviewPreview.deleteModalCancelButton().click();
    });

    it("can sort route options", () => {
        cy.mount(<TestRouteOptionResourceOverview />);
        ResourceOverviewPage.sortButton().click();

        ResourceOverviewSort.ascendingRadioButton().should("not.be.checked");
        ResourceOverviewSort.descendingRadioButton().should("be.checked");

        ResourceOverviewSort.selectAscendingSort();
        ResourceOverviewSort.cancelButton().click();
    });

    it("can add route options", () => {
        cy.mount(<TestRouteOptionResourceOverview />);
        ResourceOverviewPage.addButton().click();

        cy.wait(["@getRouteOptions", "@getExternalAircraftTypes", "@getVertiports"]);

        ResourceOverviewAdd.nameInput().clear().type("Best RouteOption");
        Select.selectByOptionIndex("Aircraft Type:*", 0);
        Select.selectByOptionIndex("Departure Vertiport:*", 0);
        Select.selectByOptionIndex("Arrival Vertiport:*", 0);

        makePostRouteOptionInterceptor();
        ResourceOverviewAdd.saveButton().click();
    });
});
