export const TestPointSequenceDetailsPage = {
    addFromListButton: () => cy.findByRole("button", { name: "Add From List" }),
    listItems: () => cy.findAllByRole("listitem"),
    // This will return a specific textbox in a given row.
    testPointRowField: (rowIndex: number, fieldName: string) =>
        cy.findAllByRole("textbox").get(`[name='formFields.${rowIndex}.${fieldName}']`),
    // This will return a list of form fields `name` attributes that end with whatever was passed in the `fieldName` argument.
    testPointField: (fieldName: string) =>
        cy.findAllByRole("textbox").get(`input[name^="formFields."][name$=".${fieldName}"]`),
};
