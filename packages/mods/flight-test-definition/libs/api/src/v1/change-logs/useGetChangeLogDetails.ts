import { useGetService } from "@voloiq/service";
import type { ChangeLogDetails } from "./apiModels";

export type UseGetChangeLogDetailsOptions = {
    definitionId: string;
    referenceId: string;
    manual?: boolean;
};

export const useGetChangeLogDetails = (options: UseGetChangeLogDetailsOptions) => {
    const { definitionId, referenceId, manual = true } = options;
    const { data: changeLog, refetchData: getChangeLog } = useGetService<ChangeLogDetails>({
        route: `ftd/v1/definitions/${definitionId}/changelogs`,
        resourceId: referenceId,
        options: { manual },
    });

    return { changeLog, getChangeLog };
};
