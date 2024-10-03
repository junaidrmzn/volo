import { generateText } from "@volocopter/text-editor-react";
import type { Requirement } from "@voloiq-typescript-api/ftd-types";
import { isJsonString } from "@voloiq/flight-test-definition-utils";
import { BulkRequirementsModal } from "../pages/definition-details/requirements/bulkRequirementsModalPageFragment";

type RequirementData = Partial<Requirement>;

export const RequirementSteps = {
    addOrEditRequirement: (requirementData: RequirementData) => {
        const { title, description, passOrFailCriteria } = requirementData;

        if (title) {
            BulkRequirementsModal.titleTextboxes().clear().type(title);
        }

        if (description) {
            BulkRequirementsModal.contentTextEditor()
                .clear()
                .type(isJsonString(description) ? generateText(JSON.parse(description)) : description);
        }

        if (passOrFailCriteria) {
            BulkRequirementsModal.passOrFailCriteriaTextEditor()
                .clear()
                .type(
                    isJsonString(passOrFailCriteria) ? generateText(JSON.parse(passOrFailCriteria)) : passOrFailCriteria
                );
        }

        BulkRequirementsModal.doneButton().click({ force: true });
    },

    deleteRequirement: () => {
        BulkRequirementsModal.deleteButtons().first().click({ force: true });
        BulkRequirementsModal.doneButton().click({ force: true });
    },
};
