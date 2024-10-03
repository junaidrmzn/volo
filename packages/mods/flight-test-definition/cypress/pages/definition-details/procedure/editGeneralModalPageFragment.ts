export const EditGeneralModal = {
    objectivesTextEditor: () => cy.contains("label", "Objectives:").parent().parent().find(".ProseMirror"),
    prerequisitesTextEditor: () => cy.contains("label", "Prerequisites:").parent().parent().find(".ProseMirror"),
    passFailCriteriaTextEditor: () =>
        cy.contains("label", "Pass/Fail Criteria:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
