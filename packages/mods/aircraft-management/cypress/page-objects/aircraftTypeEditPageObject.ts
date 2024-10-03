import { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const aircraftTypeEdit = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    validFromTextbox: () => cy.findByRole("textbox", { name: "Valid from:*" }),
    validToTextbox: () => cy.findByRole("textbox", { name: "Valid to:" }),
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
    confirmUpdateModal: {
        confirmButton: () => cy.findByRole("button", { name: "Confirm" }),
    },
    edit: (aircraftData: Partial<AircraftType>) => {
        const {
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

        if (minimumTemperature)
            aircraftTypeEdit.minTempratureNumberbox().clear().type(minimumTemperature.toString(), { force: true });
        if (maximumTemperature)
            aircraftTypeEdit.maxTempratureNumberbox().clear().type(maximumTemperature.toString(), { force: true });
        if (windSpeed) aircraftTypeEdit.maxWindSpeedNumberbox().clear().type(windSpeed.toString(), { force: true });
        if (relativeHumidity)
            aircraftTypeEdit.relHumidityNumberbox().clear().type(relativeHumidity.toString(), { force: true });
        if (rain) aircraftTypeEdit.maxPrecipitationNumberbox().clear().type(rain.toString(), { force: true });
        if (visibility) aircraftTypeEdit.minVisibilityNumberbox().clear().type(visibility.toString(), { force: true });
        if (cloudCeilingHeight)
            aircraftTypeEdit.cloudCeilingHeightNumberbox().clear().type(cloudCeilingHeight.toString(), { force: true });
        if (airDensity) aircraftTypeEdit.airDensityNumberbox().clear({ force: true }).type(airDensity.toString());
        if (massAndBalanceData?.cgPosition?.x)
            aircraftTypeEdit
                .xCoordinateNumberbox()
                .clear()
                .type(massAndBalanceData.cgPosition.x.toString(), { force: true });
        if (massAndBalanceData?.cgPosition?.y)
            aircraftTypeEdit
                .yCoordinateNumberbox()
                .clear()
                .type(massAndBalanceData.cgPosition.y.toString(), { force: true });
        if (massAndBalanceData?.bem)
            aircraftTypeEdit.basicEmptyMassNumberbox().clear().type(massAndBalanceData.bem.toString(), { force: true });
        if (massAndBalanceData?.mtom)
            aircraftTypeEdit
                .maxTakeOffMassNumberbox()
                .clear()
                .type(massAndBalanceData.mtom.toString(), { force: true });

        if (validFrom) {
            aircraftTypeEdit.validToTextbox().click();
            dateTimePicker.selectDate(new Date(validFrom));
        }
        if (validTo) {
            aircraftTypeEdit.validToTextbox().click();
            dateTimePicker.selectDate(new Date(validTo));
        }

        if (maxDurationToCsfl) aircraftTypeEdit.maxDurationToCsflNumberbox().type(maxDurationToCsfl.toString());
        if (performanceModel) Select.selectByOptionName("Performance Model:", performanceModel);
        if (voltageThreshold) aircraftTypeEdit.voltageThresholdNumberbox().type(voltageThreshold.toString());

        aircraftTypeEdit.saveButton().click();
    },
};
