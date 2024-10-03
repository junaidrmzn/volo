export const EditApplicableRequirementsModal = {
    enableRequirementButton: (requirementName: string) =>
        cy.findByRole("checkbox", { name: `Enable ${requirementName}` }),
    disableRequirementButton: (requirementName: string) =>
        cy.findByRole("checkbox", { name: `Disable ${requirementName}` }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
