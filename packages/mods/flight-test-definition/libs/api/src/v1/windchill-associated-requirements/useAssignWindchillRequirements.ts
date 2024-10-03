import { useCreateService } from "@voloiq/service";

export type UseAssignWindchillRequirementsOptions = {
    definitionId: string;
};
export const useAssignWindchillRequirements = (options: UseAssignWindchillRequirementsOptions) => {
    const { definitionId } = options;

    const { sendRequest, state } = useCreateService<string[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
    });

    const assignWindchillRequirements = (windchillRequirementIds: string[], editSessionId: string) =>
        sendRequest({
            data: windchillRequirementIds,
            params: { editSessionId },
        });

    return { assignWindchillRequirements, isLoading: state === "pending" };
};
