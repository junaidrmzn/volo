import { format } from "date-fns";

export const crewMemberBulkEdit = {
    selectAllText: (text: string) => cy.findAllByText(text),
    selectLabelText: (text: string) => cy.findByLabelText(text),
    selectText: (text: string) => cy.findByText(text),
    bulkEditButton: () => cy.findByRole("button", { name: "Bulk Edit" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    confirmButton: () => cy.findByRole("button", { name: "Confirm" }),

    selectDate: (date: Date) => {
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
        cy.get(`.flatpickr-calendar.open [aria-label="${format(date, "LLLL d, y")}"]`).click();
    },
};
