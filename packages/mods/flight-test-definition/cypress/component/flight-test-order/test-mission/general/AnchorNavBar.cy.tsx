import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { useLocation } from "@voloiq/routing";
import { AppWithoutProvider as App } from "../../../../../src/App";
import {
    bulkCreateFlightTestCrewInterceptor,
    bulkDeleteFlightTestCrewInterceptor,
    bulkUpdateFlightTestCrewInterceptor,
    getAllFlightTestCrewInterceptor,
} from "../../../../interceptors/flightTestCrewInterceptors";
import {
    getAllFlightTestOrdersV2Interceptor,
    getFlightTestOrderV2Interceptor,
    updateFlightTestOrderV2Interceptor,
} from "../../../../interceptors/flightTestOrderInterceptors";
import { FlightTestOrderDetailsPage } from "../../../../pages/flight-test-order/flight-test-order-details/flightTestOrderDetailsPage";
import { FlightTestOrderCardPageFragment } from "../../../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderCardPageFragment";
import { isInViewport, isNotInViewport } from "../../../../support/assertions";

export function RenderHash() {
    const location = useLocation();
    const hashValue = location.hash;

    const cleanHash = hashValue.startsWith("#") ? hashValue.slice(1) : hashValue;
    return <div id="url-hash">{cleanHash}</div>;
}

describe("AnchorLinkBar Tests", () => {
    beforeEach(() => {
        getAllFlightTestOrdersV2Interceptor([]);
        getAllFlightTestCrewInterceptor();
        bulkCreateFlightTestCrewInterceptor();
        bulkUpdateFlightTestCrewInterceptor();
        bulkDeleteFlightTestCrewInterceptor();
        getFlightTestOrderV2Interceptor();
        updateFlightTestOrderV2Interceptor();
    });

    it("should render all tabs correctly", () => {
        const testFlightTestOrder = anyFlightTestOrder();

        getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
        getFlightTestOrderV2Interceptor(testFlightTestOrder);

        cy.mountFlightTestOrder(<App />);
        FlightTestOrderCardPageFragment.detailsButton().click();

        cy.findByRole("tablist", { name: "Navigation Bar" }).within(() => {
            cy.findByText("General Information").should("exist");
            cy.findByText("Test Aircraft & Configuration").should("exist");
            cy.findByText("Flight Test Crew & Occupants").should("exist");
            cy.findByText("Test Mission & Weather").should("exist");
        });
    });

    it("should scroll to the correct section on anchor link click", { scrollBehavior: false }, () => {
        const testFlightTestOrder = anyFlightTestOrder();

        getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
        getFlightTestOrderV2Interceptor(testFlightTestOrder);

        cy.mountFlightTestOrder(
            <div style={{ overflowY: "scroll", height: "100vh" }}>
                <App />
            </div>
        );

        FlightTestOrderCardPageFragment.detailsButton().click();

        FlightTestOrderDetailsPage.generalInformationHeadline().then(isInViewport);
        FlightTestOrderDetailsPage.testMissionAndWeatherHeadline().then(isNotInViewport);

        FlightTestOrderDetailsPage.checkWithinNavigationIfVisibleOrNot("General Information", "Test Mission & Weather");
        FlightTestOrderDetailsPage.checkWithinNavigationIfVisibleOrNot(
            "Test Aircraft & Configuration",
            "Test Mission & Weather"
        );
        FlightTestOrderDetailsPage.checkWithinNavigationIfVisibleOrNot("Test Mission & Weather", "General Information");

        cy.findAllByText("General Information").filter("p").then(isNotInViewport);
        cy.findAllByText("Test Mission & Weather").filter("p").then(isInViewport);
    });

    it("should navigate to the correct header element when visiting a specific url", { scrollBehavior: false }, () => {
        cy.mountSpecificUrlTestMissionAndWeather(
            <div style={{ overflowY: "scroll", height: "100vh" }}>
                <RenderHash />
                <App />
            </div>
        );

        cy.wait("@getFlightTestOrderV2");
        FlightTestOrderDetailsPage.checkWithinNavigationIfVisibleOrNot("Test Mission & Weather", "General Information");
    });
});
