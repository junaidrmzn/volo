import type { EquipmentCreate } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "../datepicker";

export const AddEquipmentModal = {
    deviceIdTextbox: () => cy.findByRole("textbox", { name: "Device id:*" }),
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    locationTextbox: () => cy.findByRole("textbox", { name: "Location:*" }),
    validTobox: () => cy.findByLabelText("Valid to:"),
    validFrombox: () => cy.findByLabelText("Valid from:*"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    addEquipment: (equipment: EquipmentCreate) => {
        const { deviceId, name, location, validFrom, validTo } = equipment;
        AddEquipmentModal.deviceIdTextbox().clear({ force: true }).type(deviceId, { force: true });
        AddEquipmentModal.nameTextbox().clear({ force: true }).type(name, { force: true });

        AddEquipmentModal.locationTextbox().clear({ force: true }).type(location, { force: true });
        AddEquipmentModal.validTobox().click();
        if (validTo) {
            DateTimePicker.selectDate(new Date(validTo));
        }
        AddEquipmentModal.validFrombox().click();
        DateTimePicker.selectDate(new Date(validFrom));
    },
};
