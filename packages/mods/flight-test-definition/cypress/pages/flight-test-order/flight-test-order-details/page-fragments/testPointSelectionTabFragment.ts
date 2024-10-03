export const TestPointSelectionTabFragment = {
    editTestPointSequencesButton: () => cy.findByRole("button", { name: "Edit Test Points Sequences" }),
    detailsButton: () => cy.findByRole("button", { name: "Details" }).first(),
};
