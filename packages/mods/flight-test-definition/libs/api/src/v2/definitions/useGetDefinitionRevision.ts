import { useGetService } from "@voloiq/service";
import { FlightTestDefinitionChangesOverview } from "./apiModels";

export type UseGetDefinitionRevisionOptions = {
    definitionId: string;
    revisionId: string;
    manual?: boolean;
};

export const useGetDefinitionRevision = (options: UseGetDefinitionRevisionOptions) => {
    const { definitionId, manual = true, revisionId } = options;

    const { data: definition, refetchData: getDefinitionRevision } = useGetService<FlightTestDefinitionChangesOverview>(
        {
            route: `ftd/v2/definitions/${definitionId}/revisions`,
            resourceId: revisionId,
            options: {
                manual,
            },
        }
    );

    return { definition, getDefinitionRevision };
};
