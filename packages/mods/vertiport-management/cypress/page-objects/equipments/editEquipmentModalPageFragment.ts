import type { EquipmentUpdate } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "../datepicker";

export const EditEquipmentModal = {
    deviceIdTextbox: () => cy.findByRole("textbox", { name: "Device id:*" }),
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    locationTextbox: () => cy.findByRole("textbox", { name: "Location:*" }),
    validTobox: () => cy.findByLabelText("Valid to:"),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    editEquipment: (equipment: EquipmentUpdate) => {
        const { deviceId, name, location, validFrom, validTo } = equipment;
        EditEquipmentModal.deviceIdTextbox().clear({ force: true }).type(deviceId, { force: true });
        EditEquipmentModal.nameTextbox().clear({ force: true }).type(name, { force: true });
        EditEquipmentModal.locationTextbox().clear({ force: true }).type(location, { force: true });
        EditEquipmentModal.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        EditEquipmentModal.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
    },
};
