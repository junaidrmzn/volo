import { format } from "date-fns";

export const dateTimePicker = {
    selectDate: (date: Date) => {
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
        cy.get(".flatpickr-calendar.open .dayContainer").within(() =>
            cy
                .get(".flatpickr-day")
                .not(".prevMonthDay")
                .not(".nextMonthDay")
                .filter(`:contains(${format(date, "d")})`)
                .first()
                .click()
        );
        cy.get(`.flatpickr-calendar.open [aria-label="Hour"]`).type(String(date.getHours()).padStart(2, "0"));
        cy.get(`.flatpickr-calendar.open [aria-label="Minute"]`)
            .type(String(date.getMinutes()).padStart(2, "0"))
            .type("{enter}", { force: true });
    },

    selectDateWithoutTime: (date: Date) => {
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
        cy.get(`.flatpickr-calendar.open [aria-label="${format(date, "LLLL d, y")}"]`).type("{enter}", { force: true });
    },
};
