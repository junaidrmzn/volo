import { Table, Tbody } from "@volocopter/design-library-react";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { makeGetRoutesInterceptor } from "../../__mocks__/cypress";
import { RouteListItem } from "./RouteListItem";

const mockedRoute = anyRoute({ id: 1, name: "route1" });

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={[`/route-options/${mockedRoute.routeOptionId}/map`]}
            path="/route-options/:routeOptionId/map"
        >
            <Table variant="striped" size="xs">
                <Tbody>
                    <RouteListItem route={mockedRoute} />
                </Tbody>
            </Table>
        </CypressAppShellWithMemoryRouter>
    );
};

beforeEach(() => {
    makeGetRoutesInterceptor();
});

describe("Route List Item", () => {
    it("should show route list item", () => {
        cy.mount(<TestComponent />);
        cy.findByText(mockedRoute.name).should("be.visible");
    });

    it("should exit button to select route", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId(`route-list-item-${mockedRoute.id}`).should("be.visible");
    });
});
