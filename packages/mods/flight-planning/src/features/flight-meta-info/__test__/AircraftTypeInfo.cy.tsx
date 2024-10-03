import {
    ExternalAircraftType,
    RouteOption,
    anyExternalAircraftType,
    anyRouteOption,
} from "@voloiq/flight-planning-api/v1";
import {
    getExternalAircraftTypesInterceptor,
    updateRouteOptionInterceptor,
} from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionMetaInfo } from "../../../../libs/cypress-page-objects";
import { CypressAppShell, CypressServiceProvider } from "../../../testing/TestWrapper";
import { AircraftTypeInfo } from "../AircraftTypeInfo";

const mountAircraftTypeInfo = (routeOption: RouteOption) =>
    cy.mount(
        <CypressAppShell>
            <CypressServiceProvider baseUrl="http://api.cypress.voloiq.io">
                <AircraftTypeInfo routeOption={routeOption} />
            </CypressServiceProvider>
        </CypressAppShell>
    );

type SetupInterceptorsOptions = {
    aircraftTypes?: ExternalAircraftType[];
    updatedRouteOption?: RouteOption;
};

const setupInterceptors = (options: SetupInterceptorsOptions = {}) => {
    const { aircraftTypes = [anyExternalAircraftType()], updatedRouteOption = anyRouteOption() } = options;

    getExternalAircraftTypesInterceptor(aircraftTypes).as("getExternalAircraftTypesInterceptor");
    updateRouteOptionInterceptor(updatedRouteOption).as("updateRouteOptionInterceptor");
};

describe("AircraftTypeInfo", () => {
    it("should able to change aircraft type", () => {
        const routeOption = anyRouteOption();
        const aircraftTypes = [anyExternalAircraftType({ name: "Region" })];
        const updatedRouteOption = anyRouteOption({ aircraftType: "Region" });

        setupInterceptors({ aircraftTypes, updatedRouteOption });
        mountAircraftTypeInfo(routeOption);

        cy.contains("Drone").should("be.visible");
        cy.wait("@getExternalAircraftTypesInterceptor");

        routeOptionMetaInfo.selectAircraftType("Region");
        cy.findByText("Confirm").click();

        cy.get("@updateRouteOptionInterceptor").its("request.body.aircraftType").should("equal", "Region");
        cy.contains(updatedRouteOption.aircraftType).should("be.visible");
    });
});
