import { TestAircraftType } from "../../component/flight-test-order/test-mission/general/GeneralTypes";
import { FlightTestOrderTestAircraftFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderTestAircraftFragment";
import { DateTimePicker } from "../../pages/utils/datepicker";
import { Select } from "../../pages/utils/select";

export const TestAircraftSteps = {
    fillInTestAircraftModalFormAndSubmit: (
        testAircraft: Pick<
            TestAircraftType,
            | "masterModel"
            | "model"
            | "msn"
            | "applicability"
            | "aircraftCallsign"
            | "flightConditions"
            | "revision"
            | "issueDateFlightConditions"
            | "permitToFly"
            | "issueDatePermitToFly"
            | "validUntil"
        >
    ) => {
        const {
            masterModel,
            model,
            msn,
            applicability,
            aircraftCallsign,
            flightConditions,
            revision,
            issueDateFlightConditions,
            permitToFly,
            issueDatePermitToFly,
            validUntil,
        } = testAircraft;

        Select.selectByOptionName("Master Model:*", masterModel);
        FlightTestOrderTestAircraftFragment.missionTitleTextBox().clear().type(model);
        FlightTestOrderTestAircraftFragment.msnTextBox().clear().type(msn);
        Select.selectByOptionName("Applicability:", applicability);
        FlightTestOrderTestAircraftFragment.aircraftCallsignTextBox().clear().type(aircraftCallsign);
        FlightTestOrderTestAircraftFragment.flightConditionsTextBox().clear().type(flightConditions);
        FlightTestOrderTestAircraftFragment.revisionTextBox().clear().type(revision);
        FlightTestOrderTestAircraftFragment.permitToFlyTextBox().clear().type(permitToFly);

        FlightTestOrderTestAircraftFragment.issueDateForFlightConditionsDateInput().click();
        DateTimePicker.selectDate(new Date(issueDateFlightConditions));

        FlightTestOrderTestAircraftFragment.issueDateForPermitToFlyDateInput().click();
        DateTimePicker.selectDate(new Date(issueDatePermitToFly));

        FlightTestOrderTestAircraftFragment.validUntilDateInput().click();
        DateTimePicker.selectDate(new Date(validUntil));

        FlightTestOrderTestAircraftFragment.doneButton().click();
    },
};
