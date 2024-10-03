import type { PadUpdate } from "@voloiq/vertiport-management-api/v1";

export const PadActionsPopover = {
    editFatoStandButton: () => cy.findByRole("button", { name: "Edit FATO / Stand" }),
    deleteFatoStandButton: () => cy.findByRole("button", { name: "Delete FATO / Stand" }),
    addFatoStandEventButton: () => cy.findByRole("button", { name: "Add Event" }),
    removeButton: () => cy.findByRole("button", { name: "Remove" }),
    padKeyTextbox: () => cy.findByRole("textbox", { name: "Key:*" }),
    externalIdTextbox: () => cy.findByRole("textbox", { name: "External Id:" }),
    coordinatesTextbox: () => cy.findByRole("textbox", { name: "Coordinates:*" }),
    heightNumberbox: () => cy.findByRole("spinbutton", { name: "Height:*" }),
    servicesMultiSelect: () => cy.findByRole("combobox", { name: "Services:" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    editPad: (pad: PadUpdate) => {
        const { padKey, externalId, location, services } = pad;
        PadActionsPopover.padKeyTextbox().clear({ force: true }).type(padKey, { force: true });
        if (externalId) {
            PadActionsPopover.externalIdTextbox().clear({ force: true }).type(externalId, { force: true });
        }
        PadActionsPopover.coordinatesTextbox()
            .clear({ force: true })
            .type(`${location.latitude.toString()}, ${location.longitude.toString()}`, { force: true });
        PadActionsPopover.heightNumberbox().clear({ force: true }).type(location.height.toString(), { force: true });
        PadActionsPopover.servicesMultiSelect().click({ force: true });
        if (services) {
            services.map((service) => cy.findByRole("button", { name: service }).click({ force: true }));
        }
    },
};
