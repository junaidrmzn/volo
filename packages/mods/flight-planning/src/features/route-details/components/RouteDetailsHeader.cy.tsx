import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { makeDeleteRouteInterceptor } from "../../__mocks__/cypress";
import { RouteDetailsHeader } from "./RouteDetailsHeader";

const mockRoute = anyRoute();

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={[`/route-options/${mockRoute.routeOptionId}/map`]}
            path="/route-options/:routeOptionId/map"
        >
            <RouteDetailsHeader route={mockRoute} />
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Route Details Header", () => {
    it("should render Route Details Header", () => {
        cy.mount(<TestComponent />);
        cy.findByText(mockRoute.name).should("be.visible");
    });

    it("should open menu by clicking menu button", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId("menu-edit-route-name-button").should("not.be.visible");
        cy.findByTestId("menu-save-route-as-template-button").should("not.be.visible");
        cy.findByTestId("menu-delete-route-button").should("not.be.visible");

        cy.findByTestId("route-details-menu-button").click();

        cy.findByTestId("menu-edit-route-name-button").should("be.visible");
        cy.findByTestId("menu-save-route-as-template-button").should("be.visible");
        cy.findByTestId("menu-delete-route-button").should("be.visible");
    });

    it("should open modal by clicking save as template button", () => {
        cy.mount(<TestComponent />);

        cy.findByTestId("route-details-menu-button").click();
        cy.findByTestId("menu-save-route-as-template-button").click();

        cy.findByTestId("form-modal-heading").should("be.visible");
        cy.findByLabelText("Name:*").should("be.visible");
        cy.findByTestId("form-modal-cancel-button").should("be.visible");
        cy.findByTestId("form-modal-set-button").should("be.visible");
    });

    it("should open modal by clicking edit name button", () => {
        cy.mount(<TestComponent />);

        cy.findByTestId("route-details-menu-button").click();
        cy.findByTestId("menu-edit-route-name-button").click();

        cy.findByTestId("form-modal-heading").should("be.visible");
        cy.findByTestId("form-modal-cancel-button").should("be.visible");
        cy.findByTestId("form-modal-set-button").should("be.visible");
    });

    it("should delete route by clicking delete route button", () => {
        cy.mount(<TestComponent />);

        cy.findByTestId("route-details-menu-button").click();

        makeDeleteRouteInterceptor();
        cy.findByTestId("menu-delete-route-button").click();
        cy.wait("@deleteRoute").its("response.statusCode").should("eq", 204);
    });
});
