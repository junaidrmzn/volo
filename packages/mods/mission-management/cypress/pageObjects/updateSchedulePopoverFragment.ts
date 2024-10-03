import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const updateSchedule = {
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    estimatedDepartureTextBox: () => cy.findByRole("textbox", { name: "Estimated Departure:*" }),
    estimatedArrivalTextBox: () => cy.findByRole("textbox", { name: "Estimated Arrival:*" }),
    updateMissionSchedule: (
        missionData: Partial<{
            estimatedDepartureDate: Date;
            estimatedArrivalDate: Date;
            delayReasonIndex: number;
        }>
    ) => {
        const { estimatedDepartureDate, estimatedArrivalDate, delayReasonIndex } = missionData;
        if (estimatedDepartureDate) {
            updateSchedule.estimatedDepartureTextBox().click();
            dateTimePicker.selectDate(estimatedDepartureDate);
        }

        if (estimatedArrivalDate) {
            updateSchedule.estimatedArrivalTextBox().click();
            dateTimePicker.selectDate(estimatedArrivalDate);
        }

        Select.selectByOptionIndex("Reason for Delay:*", delayReasonIndex || 0);
    },
};
