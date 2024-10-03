export const TestHazardAssessmentPage = {
    testHazardTitle: (testHazardTitle: string) => cy.findByText(testHazardTitle),
    previewSidePanel: () => cy.findByTestId("preview-sidepanel"),
    testHazardAssessmentTitleTextbox: () => cy.findByRole("textbox", { name: "Test Hazard Title:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
};
