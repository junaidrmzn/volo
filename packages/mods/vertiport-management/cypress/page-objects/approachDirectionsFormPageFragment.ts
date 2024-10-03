export const ApproachDirectionsFormPageFragment = {
    addButton: () => cy.findByRole("button", { name: "Add Approach Direction" }),
    checkButton: () => cy.findByRole("button", { name: "Check Approach Direction" }),
    editButton: () => cy.findByRole("button", { name: "Edit Approach Direction" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete Approach Direction" }),
    DirectionNumberbox: () => cy.findByRole("spinbutton", { name: "Direction:*" }),
};
