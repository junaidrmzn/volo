type ConfigurationFieldLabelType = "Required:" | "Status:" | "Comment to Deviations:" | "Accept?:";

export const EditAircraftReleaseConfigurationsModalFragment = {
    rowFormField: (rowIndex: number, labelName: ConfigurationFieldLabelType) =>
        cy.findAllByLabelText(labelName).eq(rowIndex),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
