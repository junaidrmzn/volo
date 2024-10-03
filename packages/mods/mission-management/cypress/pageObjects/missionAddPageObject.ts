import type { Service, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const missionAdd = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    flightNumberTextbox: () => cy.findByRole("textbox", { name: "Flight number:*" }),
    scheduledDepartureTextbox: () => cy.findByRole("textbox", { name: "Scheduled Departure:*" }),
    scheduledArrivalTextbox: () => cy.findByRole("textbox", { name: "Scheduled Arrival:*" }),

    departureVertiportCombobox: () => cy.findByRole("combobox", { name: "Departure Vertiport:*" }),
    arrivalVertiportCombobox: () => cy.findByRole("combobox", { name: "Arrival Vertiport:*" }),
    typeOfOperationCombobox: () => cy.findByRole("combobox", { name: "Type of operation:*" }),
    serviceCombobox: () => cy.findByRole("combobox", { name: "Service:*" }),

    add: (
        missionData: Partial<{
            flightNumber: string;
            departureTime: Date;
            arrivalTime: Date;
            departureVertiport: string;
            arrivalVertiport: string;
            operations: TypeOfOperation;
            service: Service;
        }>
    ) => {
        const { flightNumber, departureTime, arrivalTime, departureVertiport, arrivalVertiport, operations, service } =
            missionData;
        if (flightNumber) missionAdd.flightNumberTextbox().type(flightNumber);
        if (departureTime) {
            missionAdd.scheduledDepartureTextbox().click();
            dateTimePicker.selectDate(departureTime);
        }
        if (arrivalTime) {
            missionAdd.scheduledArrivalTextbox().click();
            dateTimePicker.selectDate(arrivalTime);
        }

        if (departureVertiport) Select.selectByOptionName("Departure Vertiport:*", departureVertiport);
        if (arrivalVertiport) Select.selectByOptionName("Arrival Vertiport:*", arrivalVertiport);
        if (operations) Select.selectByOptionName("Type of operation:*", operations);
        if (service) Select.selectByOptionName("Service:*", service);
    },
};
