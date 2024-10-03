export const Buttons = {
    bulkEdit: () => cy.findByRole("button", { name: /bulk edit/i }),
    confirm: () => cy.findByRole("button", { name: /confirm/i }),
    done: () => cy.findByRole("button", { name: /done/i }),
    cancel: () => cy.findByRole("button", { name: /cancel/i }),
};
