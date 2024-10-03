import { Procedure, ProcedurePatch, ProcedureRead } from "@voloiq-typescript-api/ftd-types/dist";
import { anyProcedure } from "@voloiq/flight-test-definition-api/v1";
import { getProcedureInterceptor, updateProcedureInterceptor } from "../interceptors/proceduresInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { BulkAddProcedureModal } from "../pages/definition-details/procedure/bulkAddProcedureModalPageFragment";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";
import { ProcedureOverviewPage } from "../pages/definition-details/procedure/procedureOverviewPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";
import { Select } from "../pages/utils/select";

type ProcedureData = {
    title: string;
    testPointParameters: string[];
};

export const ProcedureSteps = {
    addProcedure: (procedureData: ProcedureData) => {
        const { title } = procedureData;

        ProcedureOverviewPage.addProceduresButton().click();
        BulkAddProcedureModal.titleTextbox().clear().type(title);
        BulkAddProcedureModal.doneButton().click();
    },

    editProcedure: (procedureData: Partial<ProcedureData>) => {
        const { testPointParameters, title } = procedureData;

        ProcedureOverviewPage.editProceduresButton().click();
        if (title) {
            BulkAddProcedureModal.titleTextbox().clear().type(title);
        }
        if (testPointParameters) {
            for (const testPointParameter of testPointParameters) {
                Select.selectByOptionName("Test Point Parameters:*", testPointParameter);
            }
        }
        BulkAddProcedureModal.doneButton().click();
    },

    addAnotherProcedure: (procedureData: Partial<ProcedureData>, nextProcedureIndex: number) => {
        const { title } = procedureData;
        ProcedureOverviewPage.editProceduresButton().click();
        BulkAddProcedureModal.addAnotherButton().click();
        if (title) {
            BulkAddProcedureModal.nthTitleTextbox(nextProcedureIndex).clear().type(title);
        }
        BulkAddProcedureModal.doneButton().click();
    },

    deleteProcedures: () => {
        ProcedureOverviewPage.editProceduresButton().click();
        BulkAddProcedureModal.deleteButton().click();
        BulkAddProcedureModal.doneButton().click();
    },
    openStatusModalAndTriggerStatusDropdown: (procedure: Partial<Procedure & ProcedureRead>) => {
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.changeStatusButton().click();

        cy.findByLabelText("Status").click();

        getProcedureInterceptor(anyProcedure({ ...procedure }));
    },
    changeStatusAndCheckResponse: (status: string, procedurePatchResponseBody: { data: Partial<ProcedurePatch> }) => {
        const statusDisplayName = status === "Safety Approval" ? "Safety Release" : status;
        cy.findByRole("dialog").within(() => {
            cy.findByText(statusDisplayName).click();
        });
        updateProcedureInterceptor(procedurePatchResponseBody);

        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@patchProcedure").then((interception) => {
            expect(interception?.response?.statusCode).to.eq(200);
            expect(interception?.response?.body.data.status).to.eq(status.toUpperCase());
        });
    },
};
