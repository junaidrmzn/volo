export const Checkbox = {
    findByName: (selectLabel: string) => cy.findByRole("checkbox", { name: selectLabel }),
};
