export const select = {
    selectByOptionName: (selectLabel: string, optionName: string) => {
        cy.findByLabelText(selectLabel)
            .click()
            .then((selectInput) =>
                cy
                    .get(`[id=${selectInput.attr("aria-owns")}]`)
                    .within(() => cy.findByRole("button", { name: new RegExp(`^${optionName}$`, "i") }).click())
            );
    },
    selectByOptionIndex: (selectLabel: string, index: number) => {
        cy.findByLabelText(selectLabel)
            .click()
            .then((selectInput) =>
                cy
                    .get(`[id=${selectInput.attr("aria-owns")}]`)
                    .within(() => cy.findAllByRole("button").eq(index).click())
            );
    },
};
