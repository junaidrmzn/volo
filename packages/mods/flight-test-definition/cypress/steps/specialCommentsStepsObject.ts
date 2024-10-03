import { generateText } from "@volocopter/text-editor-react";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { BulkSpecialCommentsModal } from "../pages/definition-details/special-comments/bulkEditSpecialCommentsModalPageFragment";

type SpecialCommentData = {
    comment?: string;
};

export const SpecialCommentsSteps = {
    addOrEditSpecialComment: (specialComment: SpecialCommentData) => {
        const { comment } = specialComment;

        if (comment) {
            BulkSpecialCommentsModal.commentTextEditor()
                .clear({ force: true })
                .type(isJsonString(comment) ? generateText(JSON.parse(comment)) : comment, { force: true });
        }

        BulkSpecialCommentsModal.doneButton().click({ force: true });
    },
    deleteSpecialComment: async () => {
        BulkSpecialCommentsModal.deleteButtons().first().click({ force: true });
        BulkSpecialCommentsModal.doneButton().click({ force: true });
    },
};
