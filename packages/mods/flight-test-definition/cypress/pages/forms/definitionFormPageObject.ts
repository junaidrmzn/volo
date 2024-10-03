export const DefinitionFormPage = {
    titleTextEditor: () => cy.findByRole("textbox", { name: "Title:*" }),
    summaryTextEditor: () => cy.contains("label", "Summary:*").parent().parent().find(".ProseMirror"),
    scopeTextEditor: () => cy.contains("label", "Scope:*").parent().parent().find(".ProseMirror"),
    testArticleTextbox: () =>
        cy
            .contains(
                "label",
                "Test Article / Specific Aircraft Configuration (added and/or changed from the design baseline):"
            )
            .parent()
            .parent()
            .find(".ProseMirror"),
    ataNumberbox: () => cy.findByRole("spinbutton", { name: "ATA:*" }),
    testNumberbox: () => cy.findByRole("spinbutton", { name: "Test Number:*" }),
    revisionbox: () => cy.findByRole("textbox", { name: "Revision:*" }),
    modelTextBox: () => cy.findByRole("textbox", { name: "Model:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
