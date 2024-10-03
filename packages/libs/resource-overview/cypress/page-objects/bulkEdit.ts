export const BulkEdit = {
    modalHeadingLabel: () => cy.findByLabelText(/bulk edit - any module/i),
    editPropertiesLabel: () => cy.findByLabelText(/edit properties/i),
    archiveLabel: () => cy.findByLabelText(/archive/i),
    propertyLabel: () => cy.findByLabelText(/property/i),
    changeToLabel: () => cy.findByLabelText(/change to/i),
    confirmModalHeading: () => cy.findByLabelText(/confirm - multi edit/i),
};
