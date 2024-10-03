import type { Region } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "./datepicker";

export const RegionEditPage = {
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    validTobox: () => cy.findByLabelText("Valid to:"),
    publicFrombox: () => cy.findByLabelText("Public from:"),
    publicTobox: () => cy.findByLabelText("Public to:"),
    latitudeNumberbox: () => cy.findByRole("spinbutton", { name: "Latitude:*" }),
    longitudeNumberbox: () => cy.findByRole("spinbutton", { name: "Longitude:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    edit: (regionData: Region) => {
        const { name, validTo, validFrom, publicTo, publicFrom } = regionData;

        RegionEditPage.nameTextbox().clear().type(name);
        RegionEditPage.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        RegionEditPage.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
        RegionEditPage.publicFrombox().clear({ force: true }).click();
        if (publicFrom) {
            DateTimePicker.selectDate(new Date(publicFrom));
        }
        RegionEditPage.publicTobox().clear({ force: true }).click();
        if (publicTo) {
            DateTimePicker.selectDate(new Date(publicTo));
        }

        RegionEditPage.saveButton().click();
    },
};
