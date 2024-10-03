import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "./datepicker";

export const VertiportEditPage = {
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
    edit: (vertiportData: Vertiport) => {
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
        } = vertiportData;

        VertiportEditPage.nameTextbox().clear({ force: true }).type(name);
        VertiportEditPage.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        VertiportEditPage.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
        VertiportEditPage.publicFrombox().clear({ force: true }).click();
        if (publicFrom) {
            DateTimePicker.selectDate(new Date(publicFrom));
        }
        VertiportEditPage.publicTobox().clear({ force: true }).click();
        if (publicTo) {
            DateTimePicker.selectDate(new Date(publicTo));
        }
        VertiportEditPage.coordinateButton().click();
        VertiportEditPage.longitudeNumberbox().clear().type(location.longitude.toString());
        VertiportEditPage.latitudeNumberbox().clear().type(location.latitude.toString());
        VertiportEditPage.applyButton().click();
        if (iataCode) VertiportEditPage.iAtaCodeTextbox().clear().type(iataCode);
        if (icaoCode) VertiportEditPage.iCaoCodeTextbox().clear().type(icaoCode);
        if (code) VertiportEditPage.codeTextbox().clear().type(code);
        VertiportEditPage.shortNameTextbox().clear().type(shortName);
        VertiportEditPage.timeZoneTextbox().clear().type(timeZone);
        VertiportEditPage.elevationNumberbox().clear({ force: true }).type(elevation.toString(), { force: true });
        VertiportEditPage.saveButton().click();
    },
};
