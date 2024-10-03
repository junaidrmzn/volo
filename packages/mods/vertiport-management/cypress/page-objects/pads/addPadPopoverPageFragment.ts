import type { PadCreate } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "../datepicker";

export const AddPadPopover = {
    padKeyTextbox: () => cy.findByRole("textbox", { name: "Key:*" }),
    externalIdTextbox: () => cy.findByRole("textbox", { name: "External Id:" }),
    coordinatesTextbox: () => cy.findByRole("textbox", { name: "Coordinates:*" }),
    heightNumberbox: () => cy.findByRole("spinbutton", { name: "Height:*" }),
    validTobox: () => cy.findByLabelText("Valid to:"),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    servicesMultiSelect: () => cy.findByRole("combobox", { name: "Services:" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    addPad: (pad: PadCreate) => {
        const { padKey, externalId, location, validFrom, validTo, services } = pad;
        AddPadPopover.padKeyTextbox().clear({ force: true }).type(padKey, { force: true });
        if (externalId) {
            AddPadPopover.externalIdTextbox().clear({ force: true }).type(externalId, { force: true });
        }
        AddPadPopover.coordinatesTextbox()
            .clear({ force: true })
            .type(`${location.latitude.toString()}, ${location.longitude.toString()}`, { force: true });
        AddPadPopover.heightNumberbox().clear({ force: true }).type(location.height.toString(), { force: true });
        AddPadPopover.servicesMultiSelect().click({ force: true });
        if (services) {
            services.map((service) => cy.findByRole("button", { name: service }).click({ force: true }));
        }
        AddPadPopover.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        AddPadPopover.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
    },
};
