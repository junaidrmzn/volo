import { anyExternalAircraftType, anyRoute } from "@voloiq/flight-planning-api/v1";
import { EnergySettingPanel } from "../../../cypress/page-objects/stateOfChargeSettings";
import { Button } from "../../../cypress/selectors";
import { Sidebar } from "../../components";
import { CypressAppShellWithOutletContext } from "../../testing/TestWrapper";
import { mockedBaseUrl } from "../../testing/url";
import { AIRCRAFT_TYPE, convertEnergySettingUnitsForDisplay } from "../../utils";
import { makeGetExternalAircraftTypesInterceptor, makeGetRouteOptionInterceptor } from "../__mocks__/cypress";
import { anySocSettings } from "../__mocks__/socSettings";
import { StateOfChargeSettings } from "./StateOfChargeSettings";

const mockedSocSettings = anySocSettings();

beforeEach(() => {
    makeGetRouteOptionInterceptor();
});
const TestComponent = () => {
    const mockedOutlet = {
        selectedRoute: anyRoute(),
        socSettings: mockedSocSettings,
        closeRightSidebar: cy.stub().as("mockedCloseRightSidebar"),
    };
    return (
        <CypressAppShellWithOutletContext
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/soc-settings"]}
            path="/route-options/:routeOptionId/map/soc-settings"
            context={mockedOutlet}
        >
            <Sidebar>
                <StateOfChargeSettings />
            </Sidebar>
        </CypressAppShellWithOutletContext>
    );
};

describe("StateOfChargeSettings", () => {
    it("should show heading", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Expert Settings").should("be.visible");
    });

    it("should fire close event by clicking close button", () => {
        cy.mount(<TestComponent />);

        Button.cancelButton().click();
        cy.get("@mockedCloseRightSidebar").should("have.been.calledOnce");
    });

    it("should show wind input as disabled", () => {
        cy.mount(<TestComponent />);

        Button.findSpinButton("Wind Speed in kts:*").should("be.visible");
        Button.findSpinButton("Wind Speed in kts:*").should("be.disabled");

        Button.findSpinButton("Wind Direction in degrees:*").should("be.visible");
        Button.findSpinButton("Wind Direction in degrees:*").should("be.disabled");
    });

    it("should have mock values", () => {
        const convertEnergySetting = convertEnergySettingUnitsForDisplay(mockedSocSettings);

        cy.mount(<TestComponent />);

        Button.findSpinButton("Wind Speed in kts:*").should("have.value", convertEnergySetting.windSpeed);
        Button.findSpinButton("Wind Direction in degrees:*").should("have.value", convertEnergySetting.windDirection);
        Button.findSpinButton("Take-Off Mass in kg:*").should("have.value", convertEnergySetting.takeoffMass);
        Button.findSpinButton("Battery Age in Charging Cycles:*").should(
            "have.value",
            convertEnergySetting.batteryCycles
        );
        Button.findSpinButton("Air Density in kg/m3:*").should("have.value", convertEnergySetting.airDensity);
        Button.findSpinButton("Ambient Temperature in °C:*").should(
            "have.value",
            convertEnergySetting.ambientTemperature
        );
        Button.findSpinButton("CSFL Energy Overhead in %:*").should(
            "have.value",
            convertEnergySetting.csflEnergyOverhead
        );
        Button.findSpinButton("PDM2 efficiency loss in %:*").should(
            "have.value",
            convertEnergySetting.pdmTwoEfficiencyLoss
        );
        Button.findSpinButton("Max. Time to CSFL in min:*").should("have.value", convertEnergySetting.maxTimeToCsfl);
        Button.findSpinButton("Discretionary Energy in kWh:*").should(
            "have.value",
            convertEnergySetting.discretionaryEnergy
        );
        Button.findSpinButton("Additional Energy in kWh:*").should("have.value", convertEnergySetting.additionalEnergy);
        Button.findSpinButton("Extra Energy in kWh:*").should("have.value", convertEnergySetting.extraEnergy);
        Button.findSpinButton("Contingency Energy in %:*").should("have.value", convertEnergySetting.contingencyEnergy);
        Button.findSpinButton("Go Around Energy in kWh:*").should("have.value", convertEnergySetting.goAroundEnergy);
        Button.findSpinButton("Horizontal Obstacle Clearance in m:*").should(
            "have.value",
            convertEnergySetting.horizontalObstacleClearance
        );
        Button.findSpinButton("Vertical Obstacle Clearance in m:*").should(
            "have.value",
            convertEnergySetting.verticalObstacleClearance
        );

        EnergySettingPanel.taxiingButton()
            .click()
            .then(() => {
                Button.findSpinButton("Departure Taxi Speed in kt:*").should(
                    "have.value",
                    convertEnergySetting.departureTaxiSpeed
                );
                Button.findSpinButton("Departure Taxi Distance in m:*").should(
                    "have.value",
                    convertEnergySetting.departureTaxiDistance
                );
                Button.findSpinButton("Arrival Taxi Speed in kt:*").should(
                    "have.value",
                    convertEnergySetting.arrivalTaxiSpeed
                );
                Button.findSpinButton("Arrival Taxi Distance in m:*").should(
                    "have.value",
                    convertEnergySetting.arrivalTaxiDistance
                );
            });

        EnergySettingPanel.expertSettingsButton()
            .click()
            .then(() => {
                Button.findSpinButton("Transition Altitude in m:*").should(
                    "have.value",
                    convertEnergySetting.transitionAltitude
                );
                Button.findSpinButton("Airspeed CSFL in kts:*").should("have.value", convertEnergySetting.airspeedCsfl);
                Button.findSpinButton("Descend Angle for CSFL in deg:*").should(
                    "have.value",
                    convertEnergySetting.descendAngleCsfl
                );
                Button.findSpinButton("Takeoff Climbspeed in m/s:*").should(
                    "have.value",
                    convertEnergySetting.climbTakeoff
                );
                Button.findSpinButton("Touchdown Climbspeed in m/s:*").should(
                    "have.value",
                    convertEnergySetting.climbTouchDown
                );
                Button.findSpinButton("Maximum Climb Rate in ft/min:*").should(
                    "have.value",
                    convertEnergySetting.maxClimbRate
                );
                Button.findSpinButton("Maximum Descend Rate in ft/min:*").should(
                    "have.value",
                    convertEnergySetting.maxDescendRate
                );
                Button.findSpinButton("Loiter Altitude in m:*").should(
                    "have.value",
                    convertEnergySetting.loiterAltitude
                );
                Button.findSpinButton("Loiter Time in sec:*").should("have.value", convertEnergySetting.loiterTime);
                Button.findSpinButton("Loiter Time for CSFL in sec:*").should(
                    "have.value",
                    convertEnergySetting.loiterTimeCsfl
                );
                Button.findSpinButton("Gross Battery Capacity in kWh:*").should(
                    "have.value",
                    convertEnergySetting.batteryCapacityOrig
                );
                Button.findSpinButton("Unusable Energy in kWh:*").should(
                    "have.value",
                    convertEnergySetting.unusableEnergy
                );
                Button.findSpinButton("Final Reserve in kWh:*").should("have.value", convertEnergySetting.finalReserve);
                Button.findSpinButton("Integration Time Step in s:*").should(
                    "have.value",
                    convertEnergySetting.integrationTimeStepsSeconds
                );
            });
    });

    it("should not able to edit Take of Mass when VOLOREGION is selected as aircraft type", () => {
        cy.mount(<TestComponent />);

        const expectedAircraftType = [{ ...anyExternalAircraftType(), productLine: AIRCRAFT_TYPE.VoloRegion }];

        makeGetExternalAircraftTypesInterceptor(expectedAircraftType);

        Button.findSpinButton("Take-Off Mass in kg:*").should("be.visible").should("be.disabled");
    });
});
