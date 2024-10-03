import { useGetAllService } from "@voloiq/service";
import { ChangeLogV2 } from "./apiModels";

export type UseGetAllChangeLogsV2Options = {
    definitionId: string;
    manual?: boolean;
};
export const useGetAllChangeLogsV2 = (options: UseGetAllChangeLogsV2Options) => {
    const { definitionId, manual = true } = options;
    const { data: changeLogsV2, sendRequest: getChangeLogsV2 } = useGetAllService<ChangeLogV2>({
        route: `ftd/v2/definitions/${definitionId}/changelogs`,
        options: { manual },
    });

    return { changeLogsV2, getChangeLogsV2 };
};
