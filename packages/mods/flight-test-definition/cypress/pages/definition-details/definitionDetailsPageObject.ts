export const DefinitionDetailsPage = {
    exportDefinitionButton: () => cy.findByRole("button", { name: "Export" }),

    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    generalTab: () => cy.findByRole("tab", { name: "General" }),
    FtiParametersTab: () => cy.findByRole("tab", { name: /fti parameters/i }),
    RequirementsTab: (requirementsCount: number) =>
        cy.findByRole("tab", { name: `Requirements (${requirementsCount})` }),
    SpecialCommentsTab: () => cy.findByRole("tab", { name: `Special Comments` }),
    AdditionalInformationTab: () => cy.findByRole("tab", { name: `Additional Information` }),
    EngineeringTestProceduresTab: () => cy.findByRole("tab", { name: `Engineering Test Procedures` }),
    flightGroundTestPlanTab: () => cy.findByRole("tab", { name: /flight\/ground test plan/i }),
    approvalSignatoryTab: () => cy.findByRole("tab", { name: /approval signatory/i }),
    testHazardAnalysisTab: () => cy.findByRole("tab", { name: /test hazard analysis/i }),
    proceduresTab: () => cy.findByRole("tab", { name: /procedures/i }),
    AttachedFilesTab: () => cy.findByRole("tab", { name: /attached files/i }),
    approvalAndVersionsTab: () => cy.findByRole("tab", { name: "Approvals & Versions" }),
    fileUploadBox: () => cy.get("input[type=file]").first(),
    actionsForFileButton: (fileName: string) => cy.findByRole("button", { name: `Actions for ${fileName}` }),
    downloadFileButton: () => cy.findByRole("button", { name: "Download File" }),
    deleteFileButton: () => cy.findByRole("dialog").findByRole("button", { name: "Delete" }),
    uploadFile: (file?: Partial<Cypress.FileReferenceObject>) =>
        DefinitionDetailsPage.fileUploadBox().selectFile(
            {
                contents: Cypress.Buffer.from("file contents"),
                fileName: "file.pdf",
                mimeType: "application/pdf",
                lastModified: Date.now(),
                ...file,
            },
            { force: true }
        ),
    linkFtiParameterButton: () => cy.findByRole("button", { name: "Add Link" }),
    editTestRequestSection: () => cy.findByRole("button", { name: "Edit Test Request Section" }),
    changeStatusButton: () => cy.findByRole("button", { name: "Change Status" }),
    addOrEditRequirementsButton: (requirementsOperation: "Add" | "Edit") =>
        cy.findAllByRole("button", { name: `${requirementsOperation} Manual Requirements` }).first(),
    requirementListItem: (requirementTitle: string) => cy.findByText(requirementTitle),
    windchillRequirementListItem: (windchillRequirementContent: string) => cy.findByText(windchillRequirementContent),
    addOrEditSpecialCommentsButton: (specialCommentsOperation: "Add" | "Edit") =>
        cy.findAllByRole("button", { name: `${specialCommentsOperation} Special Comments` }).first(),
    addOrEditWindchillRequirementsButton: (windchillRequirementsOperation: "Add" | "Edit") =>
        cy.findAllByRole("button", { name: `${windchillRequirementsOperation} Windchill Requirements` }).first(),
    showMoreButton: () => cy.findByRole("button", { name: "Show more" }).scrollIntoView(),
    windChillContainer: (containerTitle: string) => cy.findByLabelText(containerTitle),
    specialCommentListItem: (specialCommentTitle: string) => cy.findByText(specialCommentTitle),
    actionsButton: () => cy.findByRole("button", { name: "Actions" }),
    releaseAsANewRevisionButton: () => cy.findByRole("button", { name: "Release as new revision" }),
    editRevisionInfoButton: () => cy.findByRole("button", { name: "Edit Revision Info" }),
    selectRevisionFromDropdown: (ftdIdToSelect: string) => {
        cy.findByLabelText("revision-dropdown")
            .click()
            .within(() => cy.findByText(ftdIdToSelect).click());
    },
    selectedFtdRevision: (ftdId: string) => cy.findByLabelText("revision-dropdown").within(() => cy.findByText(ftdId)),
    isReadOnly: () => {
        DefinitionDetailsPage.actionsButton().should("not.exist");
    },
    isEditable: () => {
        DefinitionDetailsPage.actionsButton().should("be.visible");
        DefinitionDetailsPage.approvalAndVersionsTab().should("be.visible");
    },
    editAdditionalInformation: () => cy.findByRole("button", { name: "Edit Additional Information" }),
    addEngineeringTestProcedures: () => cy.findByLabelText("Add Engineering Test Procedures"),
    editEngineeringTestProcedures: () => cy.findByRole("button", { name: "Edit Engineering Test Procedures" }),
    deleteEngineeringTestProcedureButton: () => cy.findByLabelText("Delete"),
    dataAnalysisTextEditor: () => cy.contains("label", "Data Analysis Plan:").parent().parent().find(".ProseMirror"),
    safetyRecommendationsTextEditor: () =>
        cy.contains("label", "Special Equipment:").parent().parent().find(".ProseMirror"),
    specialEquipmentTextEditor: () =>
        cy.contains("label", "Safety Recommendations:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
