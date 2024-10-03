export const DefinitionCardPageFragment = {
    accordionButton: () => cy.findByLabelText("according-box"),
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
};
