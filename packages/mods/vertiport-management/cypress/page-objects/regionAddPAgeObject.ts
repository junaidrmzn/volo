import type { Region } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "./datepicker";

export const RegionAddPage = {
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    validTobox: () => cy.findByLabelText("Valid to:"),
    publicFrombox: () => cy.findByLabelText("Public from:"),
    publicTobox: () => cy.findByLabelText("Public to:"),
    coordinatesTextbox: () => cy.findAllByRole("textbox"),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    add: (regionData: Region) => {
        const { name, validTo, validFrom, publicTo, publicFrom } = regionData;

        RegionAddPage.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        RegionAddPage.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
        RegionAddPage.publicFrombox().clear({ force: true }).click();
        if (publicFrom) {
            DateTimePicker.selectDate(new Date(publicFrom));
        }
        RegionAddPage.publicTobox().clear({ force: true }).click();
        if (publicTo) {
            DateTimePicker.selectDate(new Date(publicTo));
        }

        RegionAddPage.nameTextbox().clear().type(name);

        RegionAddPage.coordinatesTextbox().first().clear({ force: true }).type("1.2, 3", { force: true });
        RegionAddPage.coordinatesTextbox().last().clear({ force: true }).type("1.2, 3", { force: true });

        RegionAddPage.saveButton().click();
    },
};
