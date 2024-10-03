export const TestPointOverviewPage = {
    ExpandCardButton: () => cy.findByRole("button", { name: "Expand test point card button" }),
    EditTestPointAttemptsButton: () => cy.findByRole("button", { name: "Edit Test Point Attempts Button" }),
    EditTestPointAttemptsStatusButton: (number: number) =>
        cy.findByRole("button", { name: `Edit status number ${number}` }),
    LinkNewFTOButton: () => cy.findByRole("button", { name: "Link new FTO" }),
};
