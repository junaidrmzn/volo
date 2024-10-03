import { WindchillRequirementsModal } from "../pages/definition-details/requirements/windchillRequirementsModalPageFragment";

export const WindchillRequirementsSteps = {
    searchWindchillRequirement: (searchTerm: string) => {
        WindchillRequirementsModal.searchTextbox().first().clear().type(searchTerm);
    },
    editWindchillRequirementPassOrFailCriteria: (
        documentId: string,
        windchillId: string,
        passOrFailCriteria: string
    ) => {
        WindchillRequirementsModal.windchillRequirementListItem(documentId, windchillId, false).within(() => {
            cy.findByRole("button", { name: "Pass / Fail Criteria" })
                .click({ force: true })
                .then(() => {
                    cy.findByPlaceholderText("Pass / Fail Criteria").clear().type(passOrFailCriteria);
                });
        });
    },
    assignWindchillRequirement: (documentId: string, windchillId: string) => {
        WindchillRequirementsModal.windchillRequirementListItem(documentId, windchillId, true).within(() => {
            cy.findByRole("checkbox", {
                hidden: true,
                checked: false,
            }).check({ force: true });
        });
    },
    unassignWindchillRequirement: (documentId: string, windchillId: string) => {
        WindchillRequirementsModal.windchillRequirementListItem(documentId, windchillId, true).within(() => {
            cy.findByRole("checkbox", {
                hidden: true,
                checked: true,
            }).check({ force: true });
        });
    },
    unassignWindchillRequirementFromSelectedList: (documentId: string, windchillId: string) => {
        WindchillRequirementsModal.windchillRequirementListItem(documentId, windchillId, false).within(() => {
            cy.findByRole("checkbox", {
                hidden: true,
                checked: true,
            }).check({ force: true });
        });
    },
    submit: () => {
        WindchillRequirementsModal.doneButton().click({ force: true });
    },
};
