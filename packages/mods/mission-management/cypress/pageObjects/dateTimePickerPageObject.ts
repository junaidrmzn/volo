import { format } from "date-fns";

export const dateTimePicker = {
    selectDate: (date: Date) => {
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
        cy.get(`.flatpickr-calendar.open [aria-label="${format(date, "LLLL d, y")}"]`).type("{enter}", { force: true });
    },
};
