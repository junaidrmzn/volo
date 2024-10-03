import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { TestMissionAndWeatherType } from "../../component/flight-test-order/test-mission/general/GeneralTypes";
import { FlightTestOrderTestMissionAndWeatherFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderTestMissionAndWeatherFragment";
import { DateTimePicker } from "../../pages/utils/datepicker";

export const TestMissionAndWeatherSteps = {
    fillInTestMissionAndWeatherModalFormAndSubmit: (testMissionAndWeather: TestMissionAndWeatherType) => {
        const {
            maxTestAltitude,
            flightRule,
            departure,
            arrival,
            frequencyOperations,
            frequencyTower,
            optionalFrequency,
            airspaceRequested,
            weatherLimits,
            weatherObserved,
        } = testMissionAndWeather;

        FlightTestOrderTestMissionAndWeatherFragment.maxTestAltitudeTextBox().clear().type(maxTestAltitude);
        FlightTestOrderTestMissionAndWeatherFragment.flightRuleTextBox().clear().type(flightRule);

        FlightTestOrderTestMissionAndWeatherFragment.departureDateInput().click();
        DateTimePicker.selectDate(new Date(departure));
        FlightTestOrderTestMissionAndWeatherFragment.arrivalDateInput().click();
        DateTimePicker.selectDate(new Date(arrival));

        FlightTestOrderTestMissionAndWeatherFragment.frequencyOperationsTextBox().clear().type(frequencyOperations);
        FlightTestOrderTestMissionAndWeatherFragment.frequencyTowerTextBox().clear().type(frequencyTower);
        FlightTestOrderTestMissionAndWeatherFragment.optionalFrequencyTextBox().clear().type(optionalFrequency);
        FlightTestOrderTestMissionAndWeatherFragment.airspaceRequestedTextBox().clear().type(airspaceRequested);

        FlightTestOrderTestMissionAndWeatherFragment.flightConditionsWeatherLimitsTextEditor()
            .clear()
            .type(isJsonString(weatherLimits) ? generateText(JSON.parse(weatherLimits)) : weatherLimits);

        FlightTestOrderTestMissionAndWeatherFragment.weatherObservedTextEditor()
            .clear()
            .type(isJsonString(weatherObserved) ? generateText(JSON.parse(weatherObserved)) : weatherObserved);

        FlightTestOrderTestMissionAndWeatherFragment.doneButton().click();
    },
};
