import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const missionOverview = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    actionsButton: () => cy.findByRole("button", { name: "Mission Actions" }),
    missionCardButton: (flightNumber: string) => cy.findByRole("button", { name: `Mission ${flightNumber}` }),
    detailsButton: () => cy.findByRole("button", { name: "Details" }),

    typeOfOperationCombobox: () => cy.findByRole("combobox", { name: "Type of operation:" }),
    selectTypeOfOperation: (option: string) => Select.selectByOptionName("Type of operation", option),
    applyButton: () => cy.findByRole("button", { name: "Apply" }),
    missionCard: (flightNumber: string) => cy.findByRole("button", { name: `Mission ${flightNumber}` }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel" }),
    confirmCancelButton: () => cy.findByRole("button", { name: "Yes" }),

    departureDateTextBox: () => cy.findByRole("textbox", { name: "Departure Date:*" }),
    arrivalDateTextBox: () => cy.findByRole("textbox", { name: "Arrival Date:*" }),
    closeButton: () => cy.findByRole("button", { name: "Close mission" }),

    missionClose: (
        missionData: Partial<{
            departureDate: Date;
            arrivalDate: Date;
        }>
    ) => {
        const { departureDate, arrivalDate } = missionData;
        if (departureDate) {
            missionOverview.departureDateTextBox().click();
            dateTimePicker.selectDate(departureDate);
        }

        if (arrivalDate) {
            missionOverview.arrivalDateTextBox().click();
            dateTimePicker.selectDate(arrivalDate);
        }
    },
};
