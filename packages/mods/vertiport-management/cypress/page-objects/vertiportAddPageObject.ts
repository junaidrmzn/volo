import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "./datepicker";
import { Select } from "./select";

export const VertiportAddPage = {
    coordinateButton: () => cy.findByRole("button", { name: "Coordinates" }),
    longitudeNumberbox: () => cy.findByRole("spinbutton", { name: "Longitude" }),
    latitudeNumberbox: () => cy.findByRole("spinbutton", { name: "Latitude" }),
    applyButton: () => cy.findByRole("button", { name: "Apply" }),
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    validTobox: () => cy.findByLabelText("Valid to:"),
    publicFrombox: () => cy.findByLabelText("Public from:"),
    publicTobox: () => cy.findByLabelText("Public to:"),
    iAtaCodeTextbox: () => cy.findByRole("textbox", { name: "IATA Code:" }),
    iCaoCodeTextbox: () => cy.findByRole("textbox", { name: "ICAO Code:" }),
    codeTextbox: () => cy.findByRole("textbox", { name: "Code:*" }),
    shortNameTextbox: () => cy.findByRole("textbox", { name: "Short name:*" }),
    timeZoneTextbox: () => cy.findByRole("textbox", { name: "Time zone:" }),
    coordinatesTextbox: () => cy.findByRole("textbox", { name: "Coordinates:*" }),
    regionSelect: () => cy.findByRole("combobox", { name: "Region:*" }),
    elevationNumberbox: () => cy.findByRole("spinbutton", { name: "Elevation (above sea level):*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    requiredValueErrorText: () => cy.findByText("Please fill this field"),
    add: (vertiportData: Vertiport) => {
        const {
            name,
            validTo,
            validFrom,
            publicTo,
            publicFrom,
            location,
            elevation,
            iataCode,
            icaoCode,
            code,
            shortName,
            timeZone,
            region,
            passengerCheckinType,
        } = vertiportData;

        VertiportAddPage.nameTextbox().clear({ force: true }).type(name, { force: true });
        VertiportAddPage.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        VertiportAddPage.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
        VertiportAddPage.publicFrombox().clear({ force: true }).click();
        if (publicFrom) {
            DateTimePicker.selectDate(new Date(publicFrom));
        }
        VertiportAddPage.publicTobox().clear({ force: true }).click();
        if (publicTo) {
            DateTimePicker.selectDate(new Date(publicTo));
        }
        VertiportAddPage.coordinatesTextbox().clear().should("have.value", "");
        VertiportAddPage.coordinateButton().click();
        VertiportAddPage.longitudeNumberbox().clear().type(location.longitude.toString());
        VertiportAddPage.latitudeNumberbox().clear().type(location.latitude.toString());
        VertiportAddPage.applyButton().click();
        if (iataCode) VertiportAddPage.iAtaCodeTextbox().clear().type(iataCode);
        if (icaoCode) VertiportAddPage.iCaoCodeTextbox().clear().type(icaoCode);
        if (code) VertiportAddPage.codeTextbox().clear().type(code);
        VertiportAddPage.shortNameTextbox().clear().type(shortName);
        VertiportAddPage.timeZoneTextbox().clear().type(timeZone);
        Select.selectByOptionName("Region:*", region.name);
        if (passengerCheckinType) Select.selectByOptionName("Passenger Checkin Type:*", passengerCheckinType);
        if (elevation)
            VertiportAddPage.elevationNumberbox().clear({ force: true }).type(elevation.toString(), { force: true });
    },
};
