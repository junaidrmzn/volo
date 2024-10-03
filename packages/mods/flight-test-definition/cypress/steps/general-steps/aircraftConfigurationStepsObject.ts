import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { AircraftConfigurationType } from "../../component/flight-test-order/test-mission/general/GeneralTypes";
import { FlightTestOrderAircraftConfigurationFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderAircraftConfigurationFragment";

export const AircraftConfigurationSteps = {
    fillInAircraftConfigurationModalFormAndSubmit: (aircraftConfiguration: AircraftConfigurationType) => {
        const {
            allUpMass,
            centerOfGravity,
            massAndBalanceCategory,
            ballasts,
            charging,
            bingo,
            totalDuration,
            setupSheet,
            notesToAircraft,
        } = aircraftConfiguration;

        FlightTestOrderAircraftConfigurationFragment.allUpMassTextBox().clear().type(allUpMass);
        FlightTestOrderAircraftConfigurationFragment.centerOfGravityTextBox().clear().type(centerOfGravity);
        FlightTestOrderAircraftConfigurationFragment.massAndBalanceCategory().clear().type(massAndBalanceCategory);
        FlightTestOrderAircraftConfigurationFragment.ballatsTextBox().clear().type(ballasts);
        FlightTestOrderAircraftConfigurationFragment.chargingTextBox().clear().type(charging);
        FlightTestOrderAircraftConfigurationFragment.bingoTextBox().clear().type(bingo);
        FlightTestOrderAircraftConfigurationFragment.totalDurationTextBox().clear().type(totalDuration);
        FlightTestOrderAircraftConfigurationFragment.setupSheetTextBox().clear().type(setupSheet);
        FlightTestOrderAircraftConfigurationFragment.notesToAircraftTextEditor()
            .clear()
            .type(isJsonString(notesToAircraft) ? generateText(JSON.parse(notesToAircraft)) : notesToAircraft);

        FlightTestOrderAircraftConfigurationFragment.doneButton().click();
    },
};
