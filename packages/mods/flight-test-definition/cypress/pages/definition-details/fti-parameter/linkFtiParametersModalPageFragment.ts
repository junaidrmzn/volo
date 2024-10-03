export const LinkFtiParametersModal = {
    searchInputField: () => cy.findByPlaceholderText("Search for"),
    workgroupButton: (workgroup: string) => cy.findByRole("button", { name: workgroup }),
    selectFtiParameterCheckbox: (ftiCode: string) => cy.findByRole("checkbox", { name: `Select ${ftiCode}` }),
    unselectFtiParameterCheckbox: (ftiCode: string) => cy.findByRole("checkbox", { name: `Unselect ${ftiCode}` }),
    selectedTitle: (selectedNumber: number) => cy.findByText(`Selected (${selectedNumber})`),
    makeFtiParameterEssential: (ftiCode: string) => cy.findByRole("checkbox", { name: `Make ${ftiCode} essential` }),
    makeFtiParameterDesirable: (ftiCode: string) => cy.findByRole("checkbox", { name: `Make ${ftiCode} desirable` }),
    ftiParameterSelectionIndicator: (totalFtiParametersInWorkgroup: number, selectedFtiParametersInWorkgroup: number) =>
        cy.findByText(`${totalFtiParametersInWorkgroup} FTI Parameters - ${selectedFtiParametersInWorkgroup} selected`),
    selectAllFtiParametersOfWorkgroupCheckbox: (workgroup: string) =>
        cy.findByRole("checkbox", { name: `Select all ${workgroup} FTI Parameters` }),
    unselectAllFtiParametersOfWorkgroupCheckbox: (workgroup: string) =>
        cy.findByRole("checkbox", { name: `Unselect all ${workgroup} FTI Parameters` }),
    actionsForWorkgroup: (workgroup: string) => cy.findByRole("button", { name: `Actions for ${workgroup}` }),
    makeAllEssentialButton: () => cy.findByRole("button", { name: "Make all essential" }),
    makeAllDesirableButton: () => cy.findByRole("button", { name: "Make all desirable" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    searchIndication: () =>
        cy.findByText("Search for FTI Code, Aircraft Type, Aircraft Zone, Short Description, or Workgroup"),
    saveAsParameterGroupButton: () => cy.findByRole("button", { name: /save as parameter group/i }),
    saveAsParameterGroupNameInput: () => cy.findByLabelText("Name"),
    saveAsParameterGroupSaveButton: () => cy.findByRole("button", { name: /^save$/i }),
    saveAsParameterGroupCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    deleteParameterGroupButton: () => cy.findByRole("button", { name: /delete parameter group/i }),
    parameterGroupSelect: () => cy.get(`[aria-label="Parameter group select"]`),
    safetyOfFlightCriticalButtons: () => cy.findAllByRole("status", { name: "Safety of Flight Critical" }),
};
