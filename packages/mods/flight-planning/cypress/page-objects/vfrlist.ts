export const VfrListPanel = {
    uploadButton: () => cy.findByRole("button", { name: /select file/i }),
    modalDeleteModal: () => cy.findByRole("button", { name: /delete/i }),
    modalCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    closeButton: () => cy.findByRole("button", { name: /close/i }),
    checkBoxes: () => cy.findAllByRole("checkbox"),
    selectMenu: () => cy.findByRole("combobox"),
};
