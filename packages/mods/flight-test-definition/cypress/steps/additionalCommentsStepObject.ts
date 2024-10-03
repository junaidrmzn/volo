import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { BulkAddAdditionalCommentsModal } from "../pages/definition-details/procedure/bulkAddAdditionalCommentsModalPageFragment copy";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";

type AdditionalCommentsData = {
    comment: string;
};

export const AdditionalCommentsSteps = {
    addAdditionalComments: (additionalCommentsData: AdditionalCommentsData) => {
        const { comment } = additionalCommentsData;

        ProcedureDetailsPage.addAdditionalCommentsButton().click();
        BulkAddAdditionalCommentsModal.commentTextEditor()
            .clear()
            .type(isJsonString(comment) ? generateText(JSON.parse(comment)) : comment);
        BulkAddAdditionalCommentsModal.doneButton().click();
    },

    editAdditionalComments: (additionalCommentsData: Partial<AdditionalCommentsData>) => {
        const { comment } = additionalCommentsData;

        ProcedureDetailsPage.editAdditionalCommentsButton().click();
        if (comment) {
            BulkAddAdditionalCommentsModal.commentTextEditor()
                .clear()
                .type(isJsonString(comment) ? generateText(JSON.parse(comment)) : comment);
        }
        BulkAddAdditionalCommentsModal.doneButton().click();
    },

    deleteAdditionalComments: () => {
        ProcedureDetailsPage.editAdditionalCommentsButton().click();
        BulkAddAdditionalCommentsModal.deleteButton().click();
        BulkAddAdditionalCommentsModal.doneButton().click();
    },
};
