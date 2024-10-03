import type { PadEventCreate } from "@voloiq/vertiport-management-api/v1";
import { DateTimePicker } from "../../datepicker";
import { Select } from "../../select";

export const AddPadEventPopover = {
    titleTextbox: () => cy.findByRole("textbox", { name: "Title:*" }),
    subTitleTextbox: () => cy.findByRole("textbox", { name: "Sub Title:" }),
    startDateTimebox: () => cy.findByLabelText("Start Date Time:*"),
    endDateTimebox: () => cy.findByLabelText("End Date Time:*"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    addPadEvent: (padEvent: PadEventCreate) => {
        const { title, subTitle, startTime, endTime, type } = padEvent;
        AddPadEventPopover.titleTextbox().clear({ force: true }).type(title, { force: true });
        if (subTitle) {
            AddPadEventPopover.subTitleTextbox().clear({ force: true }).type(subTitle, { force: true });
        }
        Select.selectByOptionName("Event Type:*", type);
        AddPadEventPopover.startDateTimebox().click();
        DateTimePicker.selectDate(new Date(startTime));
        AddPadEventPopover.endDateTimebox().click();
        DateTimePicker.selectDate(new Date(endTime));
    },
};
