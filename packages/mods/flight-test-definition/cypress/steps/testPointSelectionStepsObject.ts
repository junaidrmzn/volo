import { generateText } from "@volocopter/text-editor-react";
import type { TestPointSequence } from "@voloiq/flight-test-definition-api/v1";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { EditOrAddTestPointSequencesModalFragment } from "../pages/flight-test-order/flight-test-order-details/page-fragments/editOrAddTestPointSequencesModalFragment";

export const TestPointSelectionStepsObject = {
    fillInTestPointSequenceModalFormAndSubmit: (testPointSequence: TestPointSequence) => {
        const { type, testPoint, successCriteria } = testPointSequence;

        EditOrAddTestPointSequencesModalFragment.typeTextbox().clear().type(type);
        EditOrAddTestPointSequencesModalFragment.testPointTextEditor()
            .clear()
            .type(isJsonString(testPoint) ? generateText(JSON.parse(testPoint)) : testPoint);
        EditOrAddTestPointSequencesModalFragment.successCriteriaTextEditor()
            .clear()
            .type(isJsonString(successCriteria) ? generateText(JSON.parse(successCriteria)) : successCriteria);

        EditOrAddTestPointSequencesModalFragment.doneButton().click();
    },
    submitEmptyForm: () => {
        EditOrAddTestPointSequencesModalFragment.doneButton().click();
    },
    deleteFirstAndSubmit: () => {
        EditOrAddTestPointSequencesModalFragment.deleteButton().click();
        EditOrAddTestPointSequencesModalFragment.doneButton().click();
    },
};
