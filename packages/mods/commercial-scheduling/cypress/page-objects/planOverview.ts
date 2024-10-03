export const planOverview = {
    findHeading: () => cy.findByText(/commercial plan/i),
    findSubheading: () => cy.findByText(/plans & offers/i),
    findInformation: () => cy.findByText(/in this module you find all the commercial plans/i),
    findUploadNewPlanButton: () => cy.findByRole("button", { name: /upload new plan/i }),
    findList: () => cy.findByLabelText(/plans/i),
    findListItem: (planName: string) => planOverview.findList().findByLabelText(planName),
    findStatus: (planName: string, status: string) => planOverview.findListItem(planName).findByText(status),
    findActionsButton: (planName: string) =>
        planOverview.findListItem(planName).findByRole("button", { name: /actions/i }),
    findDetailButton: (planName: string) =>
        planOverview.findListItem(planName).findByRole("button", { name: /detail/i }),
    findArchiveButton: () => cy.findByRole("button", { name: /archive plan/i }),
    findEditButton: () => cy.findByRole("button", { name: /edit plan/i }),
    findDeleteButton: () => cy.findByRole("button", { name: /delete plan/i }),
};

export const planModal = {
    findUploadButton: () => cy.findByRole("button", { name: /upload/i }),
    findEditButton: () => cy.findByRole("button", { name: /edit/i }),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findPlanNameInput: () => cy.findByRole("textbox", { name: /plan name/i }),
};

export const uploadPlanModal = {
    findCsvFileInput: () => cy.get<HTMLInputElement>(`input[type="file"]`),
    upload: (planName: string) => {
        planModal.findPlanNameInput().clear().type(planName);
        uploadPlanModal.findCsvFileInput().selectFile(["cypress/fixtures/new_commercial_plan.txt"], {
            action: "select",
            force: true,
        });
        planModal.findUploadButton().click();
    },
};

export const editPlanModal = {
    findNumbersOfMissionsInPlanInput: () => cy.findByRole("spinbutton", { name: /numbers of missions in plan/i }),
    findStartDateInput: () => cy.findByRole("textbox", { name: /start date/i }),
    findEndDateInput: () => cy.findByRole("textbox", { name: /end date/i }),
    edit: (planName: string) => {
        planModal.findPlanNameInput().clear().type(planName);
        planModal.findEditButton().click();
    },
};

export const planDetail = {
    findBackButton: () => cy.findByRole("button", { name: /back/i }),
    findPublishPlanButton: () => cy.findByRole("button", { name: /publish to customer & airline/i }),
    findApprovePlanButton: () => cy.findByRole("button", { name: /approve plan/i }),
    findRejectPlanButton: () => cy.findByRole("button", { name: /reject plan/i }),
    findRequestPlanApprovalButton: () => cy.findByRole("button", { name: /request plan approval/i }),
};

export const approvePlanModal = {
    findHeading: () => cy.findByText(/confirmation/i),
    findSubheading: () =>
        cy.findByText(
            /you are about to approve the entire plan and its manual changes. it will not be visible in the customer app as long as it is not “published”. do you want to proceed?/i
        ),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findApproveButton: () => cy.findByRole("button", { name: /approve/i }),
};

export const rejectPlanModal = {
    findHeading: () => cy.findByText(/confirmation/i),
    findSubheading: () => cy.findByText(/rejecting plan/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findRejectButton: () => cy.findByRole("button", { name: "Reject" }),
};

export const publishPlanModal = {
    findHeading: () => cy.findByText(/confirmation/i),
    findQuestion: () => cy.findByText(/do you want to proceed?/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findPublishButton: () => cy.findByRole("button", { name: /publish to customer & airline/i }),
    findSuccessToast: () => cy.findByText(/you have successfully published the commercial plan to customer & airline/i),
};

export const requestPlanApprovalModal = {
    findHeading: () => cy.findByText(/warning/i),
    findSubheading: () => cy.findByText(/items invalid/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findRequestPlanApprovalButton: () => cy.findByRole("button", { name: /request plan approval/i }),
};
