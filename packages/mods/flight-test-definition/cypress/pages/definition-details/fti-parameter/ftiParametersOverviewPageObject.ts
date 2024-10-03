export const FtiParametersOverviewPage = {
    editFtiParametersButton: () => cy.findAllByRole("button", { name: "Edit FTI Parameters" }).first(),
    workgroupCard: (workgroup: string) => cy.findByRole("button", { name: workgroup }),
    safetyOfFlightCriticalBadges: () => cy.findAllByText("SoF"),
};
