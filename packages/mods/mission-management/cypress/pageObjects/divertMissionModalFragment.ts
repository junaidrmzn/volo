import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const divertMission = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    crewMemberCard: (crewMemberId: string) => cy.findByLabelText(`crewMember-${crewMemberId}`),
    divertedArrivalVertiportCombobox: () => cy.findByRole("combobox", { name: "Diverted Arrival Vertiport:*" }),
    estimatedArrivalTextbox: () => cy.findByRole("textbox", { name: "Estimated Arrival:*" }),
    dateErrorText: (date: string) => cy.findByText(`Please select a date greater than actual departure date ${date}`),
    divert: (vertiportCode: string, arrivalDateTime: Date) => {
        if (arrivalDateTime) {
            divertMission.estimatedArrivalTextbox().click();
            dateTimePicker.selectDate(arrivalDateTime);
        }
        if (vertiportCode) {
            Select.selectByOptionName("Diverted Arrival Vertiport:*", vertiportCode);
        }
    },
};
