export const WindchillRequirementsModal = {
    searchTextbox: () => cy.findByRole("textbox", { name: "Search" }),
    windchillRequirementListItem: (documentId: string, windchillId: string, isSearchResult: boolean) =>
        cy.findByRole("group", {
            name: `${isSearchResult ? "" : "Assigned "}Windchill Requirement ${documentId}-${windchillId}`,
        }),
    assignedWindchillRequirementCheckbox: (documentId: string, windchillId: string) =>
        cy.findByRole("checkbox", {
            name: `Assigned Windchill Requirement ${documentId}-${windchillId} Checkbox`,
            hidden: true,
            checked: true,
        }),
    windchillRequirementCheckbox: (documentId: string, windchillId: string, checked: boolean) =>
        cy.findByRole("checkbox", {
            name: `Windchill Requirement ${documentId}-${windchillId} Checkbox`,
            hidden: true,
            checked,
        }),
    windchillRequirementPassOrFailCriteriaTextarea: (documentId: string, windchillId: string) =>
        cy.findByRole("textbox", { name: `Windchill Requirement ${documentId}-${windchillId} Pass/Fail Criteria` }),
    doneButton: () => cy.findAllByRole("button", { name: "Done" }),
    test: (identifier: string) => cy.findByRole("group", { name: `Windchill Requirement ${identifier}` }),
};
