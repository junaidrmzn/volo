export const Button = {
    applyButton: () => cy.findByRole("button", { name: /apply/i }),
    cancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findSpinButton: (text: string) => cy.findByRole("spinbutton", { name: text }),
};
