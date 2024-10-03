import { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const aircraftTypeAdd = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    typeTextbox: () => cy.findByRole("textbox", { name: "Type:*" }),
    validFromTextbox: () => cy.findByRole("textbox", { name: "Valid from:*" }),
    validToTextbox: () => cy.findByRole("textbox", { name: "Valid to:" }),
    productLineCombobox: () => cy.findByRole("combobox", { name: "Product line:*" }),
    minTempratureNumberbox: () => cy.findByRole("spinbutton", { name: "Minimum temperature:*" }),
    maxTempratureNumberbox: () => cy.findByRole("spinbutton", { name: "Maximum temperature:*" }),
    maxWindSpeedNumberbox: () => cy.findByRole("spinbutton", { name: "Maximum wind speed:*" }),
    relHumidityNumberbox: () => cy.findByRole("spinbutton", { name: "Relative humidity:*" }),
    maxPrecipitationNumberbox: () => cy.findByRole("spinbutton", { name: "Maximum precipitation:*" }),
    minVisibilityNumberbox: () => cy.findByRole("spinbutton", { name: "Minimum visibility:*" }),
    cloudCeilingHeightNumberbox: () => cy.findByRole("spinbutton", { name: "Cloud ceiling height:*" }),
    airDensityNumberbox: () => cy.findByRole("spinbutton", { name: "Air density:*" }),
    xCoordinateNumberbox: () => cy.findByRole("spinbutton", { name: "X coordinate (relative to center of gravity):*" }),
    yCoordinateNumberbox: () => cy.findByRole("spinbutton", { name: "Y coordinate (relative to center of gravity):*" }),
    basicEmptyMassNumberbox: () => cy.findByRole("spinbutton", { name: "Basic empty mass:*" }),
    maxTakeOffMassNumberbox: () => cy.findByRole("spinbutton", { name: "Maximum take off mass:*" }),
    maxDurationToCsflNumberbox: () => cy.findByRole("spinbutton", { name: "Maximum Duration to CSFL:" }),
    voltageThresholdNumberbox: () => cy.findByRole("spinbutton", { name: "Voltage Threshold:" }),

    add: (aircraftData: Partial<AircraftType>) => {
        const {
            name,
            productLine,
            validFrom,
            validTo,
            minimumTemperature,
            maximumTemperature,
            windSpeed,
            relativeHumidity,
            rain,
            visibility,
            cloudCeilingHeight,
            airDensity,
            massAndBalanceData,
            maxDurationToCsfl,
            performanceModel,
            voltageThreshold,
        } = aircraftData;
        if (name) aircraftTypeAdd.typeTextbox().type(name);

        if (productLine) Select.selectByOptionName("Product line:*", productLine);

        if (minimumTemperature !== undefined)
            aircraftTypeAdd.minTempratureNumberbox().type(minimumTemperature.toString());
        if (maximumTemperature) aircraftTypeAdd.maxTempratureNumberbox().type(maximumTemperature.toString());
        if (windSpeed) aircraftTypeAdd.maxWindSpeedNumberbox().type(windSpeed.toString());
        if (relativeHumidity) aircraftTypeAdd.relHumidityNumberbox().type(relativeHumidity.toString());
        if (rain) aircraftTypeAdd.maxPrecipitationNumberbox().type(rain.toString());
        if (visibility) aircraftTypeAdd.minVisibilityNumberbox().type(visibility.toString());
        if (cloudCeilingHeight) aircraftTypeAdd.cloudCeilingHeightNumberbox().type(cloudCeilingHeight.toString());
        if (airDensity) aircraftTypeAdd.airDensityNumberbox().type(airDensity.toString());
        if (massAndBalanceData?.cgPosition?.x)
            aircraftTypeAdd.xCoordinateNumberbox().type(massAndBalanceData.cgPosition.x.toString());
        if (massAndBalanceData?.cgPosition?.y)
            aircraftTypeAdd.yCoordinateNumberbox().type(massAndBalanceData.cgPosition.y.toString());
        if (massAndBalanceData?.mtom)
            aircraftTypeAdd.maxTakeOffMassNumberbox().type(massAndBalanceData.mtom.toString());
        if (massAndBalanceData?.bem) aircraftTypeAdd.basicEmptyMassNumberbox().type(massAndBalanceData.bem.toString());

        if (validFrom) {
            aircraftTypeAdd.validFromTextbox().click();
            dateTimePicker.selectDate(new Date(validFrom));
        }
        if (validTo) {
            aircraftTypeAdd.validToTextbox().click();
            dateTimePicker.selectDate(new Date(validTo));
        }

        if (maxDurationToCsfl) aircraftTypeAdd.maxDurationToCsflNumberbox().type(maxDurationToCsfl.toString());
        if (performanceModel) Select.selectByOptionName("Performance Model:", performanceModel);
        if (voltageThreshold) aircraftTypeAdd.voltageThresholdNumberbox().type(voltageThreshold.toString());

        aircraftTypeAdd.saveButton().click();
    },
};
