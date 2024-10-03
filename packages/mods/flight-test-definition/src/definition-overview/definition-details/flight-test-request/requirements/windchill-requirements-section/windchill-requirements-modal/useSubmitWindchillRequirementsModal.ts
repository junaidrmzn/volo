import { useQueryClient } from "@tanstack/react-query";
import type { WindchillRequirement, WindchillRequirementPatch } from "@voloiq/flight-test-definition-api/v1";
import { getAssignedWindchillRequirementsQueryKey } from "@voloiq/flight-test-definition-api/v1";
import { useDefinitionEditSessionId } from "../../../../definition-edit-session-id-context/useDefinitionEditSessionId";
import type { PartialWindchillRequirementsHash } from "./useEditWindchillRequirements";

type WindchillRequirementItem = { id: string } & Partial<WindchillRequirement>;

type UseSubmitWindchillRequirementsModalOptions = {
    selectedWindchillRequirements: WindchillRequirement[];
    assignedWindchillRequirements: WindchillRequirementItem[];
    unassignWindchillRequirements: (ids: string[], editSessionId: string) => void;
    assignWindchillRequirements: (ids: string[], editSessionId: string) => void;
    editedRequirementsHash: PartialWindchillRequirementsHash;
    bulkEditWindchillRequirements: (windchillRequirements: WindchillRequirementPatch[], editSessionId: string) => void;
    bulkEditWindchillAssociatedRequirements: (
        windchillRequirements: WindchillRequirementPatch[],
        editSessionId: string
    ) => void;
};

export const useSubmitWindchillRequirementsModal = (options: UseSubmitWindchillRequirementsModalOptions) => {
    const {
        selectedWindchillRequirements,
        assignedWindchillRequirements,
        unassignWindchillRequirements,
        assignWindchillRequirements,
        editedRequirementsHash,
        bulkEditWindchillRequirements,
        bulkEditWindchillAssociatedRequirements,
    } = options;

    const queryClient = useQueryClient();
    const { definitionEditSessionId } = useDefinitionEditSessionId();

    const submitRequirements = async (onAfterSubmit: () => void) => {
        const requirementIds = selectedWindchillRequirements.map((requirement) => requirement.id);
        const alreadyAssignedIds = assignedWindchillRequirements.map((requirement) => requirement.id);
        const unassignableIds = alreadyAssignedIds.filter((id) => !requirementIds.includes(id));
        const assignableIds = requirementIds.filter((id) => !alreadyAssignedIds.includes(id));

        if (unassignableIds.length > 0) {
            await unassignWindchillRequirements(unassignableIds, definitionEditSessionId);
        }

        if (assignableIds.length > 0) {
            await assignWindchillRequirements(assignableIds, definitionEditSessionId);
        }

        if (editedRequirementsHash) {
            const editedRequirements = Object.values(editedRequirementsHash)
                .filter(
                    (requirement) =>
                        requirement.passOrFailCriteria !== requirement.oldPassOrFailCriteria ||
                        (requirement.id && assignableIds.includes(requirement.id))
                )
                .map((requirement) => ({
                    id: requirement.id,
                    passOrFailCriteria: requirement.passOrFailCriteria,
                }));

            if (editedRequirements.length > 0) {
                await bulkEditWindchillAssociatedRequirements(editedRequirements, definitionEditSessionId);
                await bulkEditWindchillRequirements(editedRequirements, definitionEditSessionId);
            }
        }

        await queryClient.invalidateQueries(getAssignedWindchillRequirementsQueryKey());

        onAfterSubmit();
    };

    return { submitRequirements };
};
