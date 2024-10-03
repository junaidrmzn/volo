import { useDeleteService } from "@voloiq/service";

export type UseUnassignWindchillRequirementsOptions = {
    definitionId: string;
};
export const useUnassignWindchillRequirements = (options: UseUnassignWindchillRequirementsOptions) => {
    const { definitionId } = options;

    const { sendRequest, state } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
    });

    const unassignWindchillRequirements = (windchillRequirementIds: string[], editSessionId: string) =>
        sendRequest({
            data: windchillRequirementIds,
            params: { editSessionId },
        });

    return { unassignWindchillRequirements, isLoading: state === "pending" };
};
