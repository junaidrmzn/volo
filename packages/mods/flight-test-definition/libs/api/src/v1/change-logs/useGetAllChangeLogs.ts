import { useGetAllService } from "@voloiq/service";
import type { ChangeLog } from "./apiModels";

export type UseGetAllChangeLogsOptions = {
    definitionId: string;
    manual?: boolean;
};
export const useGetAllChangeLogs = (options: UseGetAllChangeLogsOptions) => {
    const { definitionId, manual = true } = options;
    const { data: changeLogs, sendRequest: getChangeLogs } = useGetAllService<ChangeLog>({
        route: `ftd/v1/definitions/${definitionId}/changelogs`,
        options: { manual },
    });

    return { changeLogs, getChangeLogs };
};
