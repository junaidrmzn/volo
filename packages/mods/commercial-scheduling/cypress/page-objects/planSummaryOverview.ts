export const planSummaryOveriew = {
    findInformation: () => cy.findAllByText(/this is the detail of the network schedule for the commercial plan/i),
    findBanner: () => cy.findByTitle(/alert-banner/i),
    findList: () => cy.findByLabelText(/summary items/i),
    findListItem: (flightNumber: string) => planSummaryOveriew.findList().findByLabelText(flightNumber),
    findVertiportCode: (flightNumber: string, vertiportCode: string) =>
        planSummaryOveriew.findListItem(flightNumber).findByText(vertiportCode),
    findLabel: (label: string) => cy.findByText(new RegExp(`^${label}$`, "i")),
    findActionsButton: (flightNumber: string) =>
        planSummaryOveriew.findListItem(flightNumber).findByRole("button", { name: /actions/i }),
    findEditButton: (flightNumber: string) =>
        planSummaryOveriew.findListItem(flightNumber).findByRole("button", { name: /edit/i }),
    findDeleteButton: (flightNumber: string) =>
        planSummaryOveriew.findListItem(flightNumber).findByRole("button", { name: /deleteplansummary/i }),
};

export const planSummaryOveriewSidePanel = {
    findChangeRequestsTitle: (count: number) => cy.findByText(`Change Requests (${count})`),
    findChangeHistoryTitle: (count: number) => cy.findByText(`Change History (${count})`),
    findChangeRequestItems: () => cy.findByLabelText(/change requests/i),
    findChangeHistoryItems: () => cy.findByLabelText(/change history/i),
    findChangeRequestActionButton: (labelText: string) => cy.findByRole("button", { name: labelText }),
    findApproveAllButton: () => cy.findByRole("button", { name: /approve all/i }),
    findApproveButton: () => cy.findByRole("button", { name: /approve/i }),
};

export const addPlanSummaryModal = {
    findCommentInput: () => cy.findByLabelText("Edit Comment:*"),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findConfirmButton: () => cy.findByRole("button", { name: /confirm/i }),
    findOverwriteButton: () => cy.findByRole("button", { name: /overwrite/i }),
    add: (comment: string) => {
        addPlanSummaryModal.findCommentInput().clear().type(comment);
        addPlanSummaryModal.findConfirmButton().click();
    },
};
