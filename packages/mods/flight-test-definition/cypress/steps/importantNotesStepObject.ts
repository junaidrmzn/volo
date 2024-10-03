import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { BulkAddImportantNotesModal } from "../pages/definition-details/procedure/bulkAddImportantNotesModalPageFragment";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";

type ImportantNotesData = {
    title: string;
    description: string;
};

export const ImportantNotesSteps = {
    addImportantNotes: (procedureData: ImportantNotesData) => {
        const { description, title } = procedureData;

        ProcedureDetailsPage.addImportantNotesButton().click();
        BulkAddImportantNotesModal.titleTextbox().clear().type(title);
        BulkAddImportantNotesModal.descriptionTextEditor()
            .clear()
            .type(isJsonString(description) ? generateText(JSON.parse(description)) : description);
        BulkAddImportantNotesModal.doneButton().click();
    },

    editImportantNotes: (procedureData: Partial<ImportantNotesData>) => {
        const { description, title } = procedureData;

        ProcedureDetailsPage.editImportantNotesButton().click();
        if (title) {
            BulkAddImportantNotesModal.titleTextbox().clear().type(title);
        }
        if (description) {
            BulkAddImportantNotesModal.descriptionTextEditor()
                .clear()
                .type(isJsonString(description) ? generateText(JSON.parse(description)) : description);
        }
        BulkAddImportantNotesModal.doneButton().click();
    },

    deleteImportantNotes: () => {
        ProcedureDetailsPage.editImportantNotesButton().click();
        BulkAddImportantNotesModal.deleteButton().click();
        BulkAddImportantNotesModal.doneButton().click();
    },
};
