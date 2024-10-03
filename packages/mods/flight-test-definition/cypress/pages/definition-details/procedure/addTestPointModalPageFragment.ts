export const AddTestPointModal = {
    grossWeightFormInput: (rowIndex: number) =>
        cy.findAllByRole("textbox").get(`[name='formFields.${rowIndex}.grossWeight']`),
    centerOfGravityFormInput: (rowIndex: number) =>
        cy.findAllByRole("textbox").get(`[name='formFields.${rowIndex}.centerOfGravity']`),
    testPointParameterFormInput: (rowIndex: number, testPointParameterId: string) =>
        cy.findAllByRole("textbox").get(`[name='formFields.${rowIndex}.testPointParameter-${testPointParameterId}']`),
    commentsFormInput: (rowIndex: number) =>
        cy.findAllByRole("textbox").get(`[name='formFields.${rowIndex}.comments']`),
    isApplicableForDevelopmentFormInput: (value: string) => cy.findAllByRole("radio").get(`[value='${value}']`),
    doneButton: () => cy.findByRole("button", { name: /done/i }),
    backButton: () => cy.findByRole("button", { name: "Back to overview" }),
};
