import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    getApplicableRequirementsQueryKey,
    useBulkSetApplicableRequirements,
    useGetAllApplicableRequirementsQuery,
} from "@voloiq/flight-test-definition-api/v1";

export type ToggleApplicableRequirementsModalProps = {
    definitionId: string;
    procedureId: string;
    isOpen?: boolean;
    onClose: () => void;
};

export type UseToggleableApplicableRequirementsOptions = {
    definitionId: string;
    procedureId: string;
    editSessionId: string;
};
export const useToggleableApplicableRequirements = (options: UseToggleableApplicableRequirementsOptions) => {
    const { definitionId, procedureId, editSessionId } = options;
    const [toggledRequirements, setToggledRequirements] = useState<Record<string, boolean>>({});
    const { applicableRequirements } = useGetAllApplicableRequirementsQuery({ definitionId, procedureId });
    const { bulkSetApplicableRequirements } = useBulkSetApplicableRequirements({
        definitionId,
        procedureId,
    });
    const onSwitchApplicableRequirement = (options: { requirementId: string; isApplicable: boolean }) => {
        const { isApplicable, requirementId } = options;
        setToggledRequirements((previousToggledRequirements) => ({
            ...previousToggledRequirements,
            [requirementId]: isApplicable,
        }));
    };

    const queryClient = useQueryClient();
    const onSaveApplicableRequirements = async () => {
        const data = Object.entries(toggledRequirements).map(([requirementId, isApplicable]) => ({
            id: requirementId,
            applicable: isApplicable,
        }));
        await bulkSetApplicableRequirements({
            data,
            params: {
                editSessionId,
            },
        });
        queryClient.invalidateQueries(getApplicableRequirementsQueryKey());
    };

    const getIsApplicableRequirementApplicable = (applicableRequirementId: string) => {
        const isApplicable = toggledRequirements[applicableRequirementId];
        if (isApplicable === undefined) {
            return applicableRequirements?.find(
                (applicableRequirement) => applicableRequirement.id === applicableRequirementId
            )?.applicable;
        }
        return isApplicable;
    };

    return {
        applicableRequirements,
        onSwitchApplicableRequirement,
        onSaveApplicableRequirements,
        getIsApplicableRequirementApplicable,
    };
};
