export const Select = {
    selectByOptionName: (selectLabel: string, optionName: string) => {
        cy.findByLabelText(selectLabel).click({ force: true });
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy
                .get(`[id=${selectInput.attr("aria-owns")}]`)
                .within(() => cy.findByRole("button", { name: new RegExp(`^${optionName}$`, "i") }).click())
        );
    },
    selectByOptionIndex: (selectLabel: string, index: number) => {
        cy.findByLabelText(selectLabel).click({ force: true });
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy.get(`[id=${selectInput.attr("aria-owns")}]`).within(() => cy.findAllByRole("button").eq(index).click())
        );
    },
    selectAllByOptionIndex: (formIndex: number, selectLabel: string, index: number) => {
        cy.findAllByLabelText(selectLabel).eq(formIndex).click({ force: true });
        cy.findAllByLabelText(selectLabel)
            .eq(formIndex)
            .then((selectInput) =>
                cy
                    .get(`[id=${selectInput.attr("aria-owns")}]`)
                    .within(() => cy.findAllByRole("button").eq(index).click())
            );
    },
};
