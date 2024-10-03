import { CreateFileFlightPlan } from "../../../cypress/page-objects";
import { Select } from "../../../cypress/selectors";
import { CypressAppShellWithMemoryRouter } from "../../testing/TestWrapper";
import { mockedBaseUrl } from "../../testing/url";
import {
    makeGetExternalAircraftTypesInterceptor,
    makeGetExternalAircraftsInterceptor,
    makeGetRoutesInterceptor,
    makeGetServiceProvidersInterceptor,
    makePostFlightPlanInterceptor,
} from "../__mocks__/cypress";
import { FileFlightPlan } from "./FileFlightPlan";
import { mockedFlightPlan } from "./__mocks__/flightplan";

const TestCypressAppShellWithMemoryRouter = (props: { route: string; path: string }) => {
    const { route, path } = props;
    return (
        <CypressAppShellWithMemoryRouter baseUrl={mockedBaseUrl} initialEntries={[route]} path={path}>
            <FileFlightPlan />
        </CypressAppShellWithMemoryRouter>
    );
};

beforeEach(() => {
    makeGetServiceProvidersInterceptor();
    makeGetExternalAircraftsInterceptor();
    makeGetExternalAircraftTypesInterceptor();
    makeGetRoutesInterceptor();
});

describe("File Flight Plan", () => {
    it("should render form", () => {
        cy.mount(
            <TestCypressAppShellWithMemoryRouter
                route="/route-options/34/plan"
                path="/route-options/:routeOptionId/plan"
            />
        );

        CreateFileFlightPlan.headerText().should("be.visible");
        CreateFileFlightPlan.scheduledDepartureTime().should("be.visible");
        CreateFileFlightPlan.scheduledArrivalTime().should("be.visible");
        CreateFileFlightPlan.typeSelect().should("be.visible");
        CreateFileFlightPlan.flightRulesSelect().should("be.visible");
        CreateFileFlightPlan.aircraftSelect().should("be.visible");
        CreateFileFlightPlan.numberOfPaxInput().should("be.visible");
        CreateFileFlightPlan.preferredRouteSelect().should("be.visible");
        CreateFileFlightPlan.alternativeRoutesMultiSelect().should("be.visible");
        CreateFileFlightPlan.utmProviderSelect().should("be.visible");
        CreateFileFlightPlan.submitButton().should("be.visible");
    });

    it("clicking create should trigger validation", () => {
        cy.mount(
            <TestCypressAppShellWithMemoryRouter
                route="/route-options/34/plan"
                path="/route-options/:routeOptionId/plan"
            />
        );
        CreateFileFlightPlan.submitButton().click();
        cy.findAllByText("Please fill out this field").should("be.visible");
    });

    it("clicking create should send HTTP request", () => {
        cy.mount(
            <TestCypressAppShellWithMemoryRouter
                route="/route-options/34/plan"
                path="/route-options/:routeOptionId/plan"
            />
        );

        cy.wait(["@getServiceProviders", "@getExternalAircrafts", "@getExternalAircraftTypes", "@getRoutes"]);

        CreateFileFlightPlan.numberOfPaxInput().as("numberOfPaxInput");
        cy.get("@numberOfPaxInput").focus();
        cy.get("@numberOfPaxInput").clear({ force: true });
        CreateFileFlightPlan.numberOfPaxInput().type("3", { force: true });

        CreateFileFlightPlan.setScheduledDepartureTime(mockedFlightPlan);
        CreateFileFlightPlan.setScheduledArrivalTime(mockedFlightPlan);
        Select.selectByOptionIndex("Type:*", 0);
        Select.selectByOptionIndex("Flight Rules:*", 0);
        Select.selectByOptionIndex("Select Aircraft:*", 0);
        Select.selectByOptionIndex("Preferred Route:*", 0);
        CreateFileFlightPlan.alternativeRoutesMultiSelect().click({ force: true });
        cy.findByRole("button", { name: "route2" }).click();
        Select.selectByOptionIndex("UTM Provider:*", 0);

        makePostFlightPlanInterceptor();
        CreateFileFlightPlan.submitButton().click();
        cy.findByText("Successfully sent flight plan to USSP").should("be.visible");
        cy.wait("@postFlightPlan").its("response.statusCode").should("eq", 201);
    });
});
