import { format } from "date-fns";
import { toLocalDate } from "@voloiq/utils";

export const DateTimePicker = {
    selectDate: (date: Date) => {
        const finalDate = toLocalDate(date);
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(finalDate, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(finalDate, "LLLL"));
        cy.get(".flatpickr-calendar.open .dayContainer").within(() =>
            cy
                .get(".flatpickr-day")
                .not(".prevMonthDay")
                .not(".nextMonthDay")
                .filter(`:contains(${format(finalDate, "d")})`)
                .first()
                .click()
        );
    },
    selectDateTime: (date: Date) => {
        const finalDate = toLocalDate(date);
        DateTimePicker.selectDate(date);
        cy.get(`.flatpickr-calendar.open [aria-label="Hour"]`).type(String(finalDate.getHours()).padStart(2, "0"));
        cy.get(`.flatpickr-calendar.open [aria-label="Minute"]`)
            .type(String(finalDate.getMinutes()).padStart(2, "0"))
            .type("{enter}");
    },
};
