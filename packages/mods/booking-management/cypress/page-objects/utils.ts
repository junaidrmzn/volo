import { format } from "date-fns";

export const Select = {
    selectByOptionName: (selectLabel: string, optionName: string) => {
        cy.findByLabelText(selectLabel).click();
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy
                .get(`[id=${selectInput.attr("aria-owns")}]`)
                .within(() => cy.findByRole("button", { name: new RegExp(`^${optionName}$`, "i") }).click())
        );
    },
    selectByOptionIndex: (selectLabel: string, index: number) => {
        cy.findByLabelText(selectLabel).click();
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy.get(`[id=${selectInput.attr("aria-owns")}]`).within(() => cy.findAllByRole("button").eq(index).click())
        );
    },
};

export const dateTimePicker = {
    selectDate: (date: Date) => {
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
        cy.get(`.flatpickr-calendar.open [aria-label="${format(date, "LLLL d, y")}"]`).type("{enter}", { force: true });
    },
};
