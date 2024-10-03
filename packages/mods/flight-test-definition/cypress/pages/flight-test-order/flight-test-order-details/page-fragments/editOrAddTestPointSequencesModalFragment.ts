export const EditOrAddTestPointSequencesModalFragment = {
    addAnotherTestPointSequenceButton: () => cy.findByRole("button", { name: "Add Another Test Point Sequence" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    typeTextbox: () => cy.findByRole("textbox", { name: "Type:" }),
    testPointTextEditor: () => cy.contains("label", "Test Point:").parent().parent().find(".ProseMirror"),
    successCriteriaTextEditor: () => cy.contains("label", "Success Criteria:").parent().parent().find(".ProseMirror"),
};
