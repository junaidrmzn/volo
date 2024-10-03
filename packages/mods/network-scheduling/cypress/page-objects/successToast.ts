export const successToast = {
    successMessage: () => cy.findByRole("alert").should("include.text", "All ok."),
    closeToast: () => successToast.successMessage().within(() => cy.findByRole("button", { name: "Close" })),
};
