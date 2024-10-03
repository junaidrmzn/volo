import { format } from "date-fns";

export const DateTimePicker = {
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
    },
};
