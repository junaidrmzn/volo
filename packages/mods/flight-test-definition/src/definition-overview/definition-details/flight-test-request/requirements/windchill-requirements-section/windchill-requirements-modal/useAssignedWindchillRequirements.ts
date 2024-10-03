import {
    useAssignWindchillRequirements,
    useGetAssignedWindchillRequirementsQuery,
    useUnassignWindchillRequirements,
} from "@voloiq/flight-test-definition-api/v1";
import { useDefinition } from "../../../../definition-context/useDefinition";

export const useAssignedWindchillRequirements = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();

    const { assignedWindchillRequirements, isLoading: isFetchAssignedRequirementsLoading } =
        useGetAssignedWindchillRequirementsQuery({
            definitionId,
        });
    const { assignWindchillRequirements, isLoading: isAssignRequirementsLoading } = useAssignWindchillRequirements({
        definitionId,
    });
    const { unassignWindchillRequirements, isLoading: isUnassignRequirementsLoading } =
        useUnassignWindchillRequirements({ definitionId });

    return {
        assignedWindchillRequirements,
        assignWindchillRequirements,
        unassignWindchillRequirements,
        areAssignOperationsLoading:
            isFetchAssignedRequirementsLoading || isAssignRequirementsLoading || isUnassignRequirementsLoading,
    };
};
